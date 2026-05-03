import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// OpenRouter Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Helper to call OpenRouter
async function getWorkingModel(prompt) {
  try {
    console.log("Calling OpenRouter...");
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5000", // Optional, for OpenRouter rankings
        "X-Title": "VoteSetu", // Optional, for OpenRouter rankings
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001", 
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OpenRouter Error:", data.error);
      throw new Error(data.error.message || "OpenRouter API error");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
  }
}

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// API Endpoints
app.post('/api/onboard', (req, res) => {
  const { name, age, location } = req.body;
  res.json({ success: true, user: { name, age: parseInt(age), location } });
});

app.post('/api/dashboard-analysis', async (req, res) => {
  const { name, age, location, language = 'English' } = req.body;
  console.log(`Dashboard Request: Language=${language}, User=${name}`);
  
  const prompt = `You are the lead voting consultant for "VoteSetu". Generate a DEEPLY INFORMATIVE, HUMAN-CENTRIC, and PERSONALIZED voting dashboard plan in ${language}.
    User Context:
    Name: ${name}
    Age: ${age}
    Location: ${location}
    Preferred Language: ${language}

    The user is ${age} years old. ${age >= 18 ? "They are eligible." : "They are under 18."} 
    
    INSTRUCTIONS FOR HUMAN-LIKE DEPTH (RESPOND ENTIRELY IN ${language}):
    1. Do NOT use bullet points in descriptions. Use long, proper paragraphs.
    2. Use normal sentence casing for all text.
    3. Explain the process as if you are talking to a friend who knows nothing about voting.
    4. Be specific about ${location}'s administrative process if possible.
    5. For a ${age} year old, explain the nuances of checking the electoral roll vs. fresh registration in great detail.
    6. Mention specific portals like NVSP and the 'Voter Helpline App'.
    7. ALL TEXT fields in the JSON must be in ${language}.

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
  const { question, language = 'English' } = req.body;
  console.log(`AI Assistant Request: Language=${language}, Question=${question}`);
  try {
    const prompt = `You are the expert VoteSetu AI Assistant. Provide a DEEP, DETAILED, and INFORMATIVE response in ${language} to the following question about voting in India. 
    Use proper sentence casing, explain nuances, and provide context to ensure the user fully understands the topic. 
    Use a professional yet helpful tone.
    IMPORTANT: You MUST respond in ${language}.
    
    Question: ${question}`;
    const answer = await getWorkingModel(prompt);
    res.json({ answer });
  } catch (error) {
    console.error("Assistant Error:", error.message);
    res.json({ answer: "I couldn't find any working AI models for this API key. Please check your Google AI Studio settings." });
  }
});

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
