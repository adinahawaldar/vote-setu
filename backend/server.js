import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to try multiple models in case of regional or account restrictions
async function getWorkingModel(prompt) {
  const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
  let lastError = null;

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error.message);
      lastError = error;
      if (error.message.includes("404")) continue;
      throw error; 
    }
  }
  throw lastError;
}

// Endpoints
app.post('/api/onboard', (req, res) => {
  const { name, age, location } = req.body;
  res.json({ success: true, user: { name, age: parseInt(age), location } });
});

app.post('/api/dashboard-analysis', async (req, res) => {
  const { name, age, location } = req.body;
  
  const prompt = `You are the lead voting consultant for "VoteSetu". Generate a DEEPLY INFORMATIVE, HUMAN-CENTRIC, and PERSONALIZED voting dashboard plan.
    User Context:
    Name: ${name}
    Age: ${age}
    Location: ${location}

    The user is ${age} years old. ${age >= 18 ? "They are eligible." : "They are under 18."} 
    
    INSTRUCTIONS FOR HUMAN-LIKE DEPTH:
    1. Do NOT use bullet points in descriptions. Use long, proper paragraphs.
    2. Use normal sentence casing (not ALL CAPS) for all text.
    3. Explain the process as if you are talking to a friend who knows nothing about voting.
    4. Be specific about ${location}'s administrative process if possible.
    5. For a ${age} year old, explain the nuances of checking the electoral roll vs. fresh registration in great detail.
    6. Mention specific portals like NVSP and the 'Voter Helpline App'.

    Return a JSON object with the following structure (NO MARKDOWN, JUST JSON):
    {
      "isEligible": boolean,
      "nextStep": { 
        "title": string, 
        "description": string,
        "actionCall": string,
        "link": string
      },
      "documents": [ { "title": string, "description": string } ],
      "registrationSteps": [ { "title": string, "description": string } ],
      "journey": [
        { "id": 1, "label": "Eligibility Status", "status": "completed" },
        { "id": 2, "label": "Electoral Roll Check", "status": "pending" },
        { "id": 3, "label": "Application Status", "status": "locked" },
        { "id": 4, "label": "Polling Day Ready", "status": "locked" }
      ]
    }`;

  try {
    const text = await getWorkingModel(prompt);
    const cleanedText = text.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(cleanedText));
  } catch (error) {
    console.error("Analysis Error:", error.message);
    const isEligible = age >= 18;
    
    if (!isEligible) {
      res.json({
        isEligible: false,
        nextStep: { 
          title: "Your Democratic Journey Begins Soon", 
          description: `You are currently ${age} years old. In India, you become eligible to vote on the first qualifying date after you turn 18.`,
          actionCall: "Learn Voting Rules",
          link: "https://ecisveep.nic.in/"
        },
        documents: [
          { title: "Age Proof", description: "Your 10th Standard Marksheet or Birth Certificate will be required." }
        ],
        registrationSteps: [
          { title: "Wait for 18th Birthday", description: "You can only be added to the roll once you reach the qualifying age." }
        ],
        journey: [
          { id: 1, label: "Age Verification", status: "pending" },
          { id: 2, label: "Wait for Eligibility", status: "locked" }
        ],
        warning: "AI restricted or unavailable. Showing tailored guidelines."
      });
      return;
    }

    res.json({
      isEligible: true,
      nextStep: { 
        title: "Verify Electoral Presence", 
        description: `Since you are ${age}, you should search the National Electoral Search portal first.`,
        actionCall: "Check Electoral Roll",
        link: "https://electoralsearch.eci.gov.in/"
      },
      documents: [
        { title: "Proof of Identity", description: "Aadhar, PAN card, or Passport are accepted." }
      ],
      registrationSteps: [
        { title: "Search Name on Portal", description: `Search your name in ${location}.` }
      ],
      journey: [
        { id: 1, label: "Age & Eligibility", status: "completed" },
        { id: 2, label: "Roll Verification", status: "pending" }
      ],
      warning: "AI restricted or unavailable. Using default Indian voting guidelines."
    });
  }
});

app.post('/api/ai-assistant', async (req, res) => {
  const { question } = req.body;
  try {
    const prompt = `Voting assistant for VoteSetu. Use normal sentence casing. Answer concisely. Question: ${question}`;
    const answer = await getWorkingModel(prompt);
    res.json({ answer });
  } catch (error) {
    console.error("Assistant Error:", error.message);
    res.json({ answer: "I couldn't find any working AI models for this API key. Please check your Google AI Studio settings." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
