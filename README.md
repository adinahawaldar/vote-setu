#  VoteSetu: Your Bridge to Democracy



**VoteSetu** is an advanced, AI-driven platform designed to simplify and democratize the voting process in India. Built for the **Google Virtual Prompt War Hackathon**, it leverages cutting-edge Large Language Models (LLMs) and sophisticated prompt engineering to provide personalized, multilingual guidance to millions of voters.

---

##  Key Features

### 1. Multilingual AI Assistant
Navigate the complexities of Indian elections in your mother tongue. VoteSetu supports:
- **English, हिंदी (Hindi), मराठी (Marathi), తెలుగు (Telugu), தமிழ் (Tamil), ಕನ್ನಡ (Kannada), বাংলা (Bengali)**.
- Deep, context-aware responses using **Gemini 2.0 Flash**.
- Typewriter animation for a smooth, human-like conversational experience.

### 2. Personalized Voting Dashboard
Generate a custom "Roadmap to the Booth" based on your specific profile:
- **Eligibility Check**: Instant analysis based on age and location.
- **Document Checklist**: Personalized list of required ID proofs (Aadhar, PAN, etc.).
- **Journey Tracker**: Visual progress from registration to polling day.

### 3. Smart Polling Booth Locator
Integrated Google Maps functionality to help you find your nearest polling hubs instantly.

### 4. Human-Centric Prompt Engineering
The core of VoteSetu lies in its **Prompt Architecture**. We use "Chain of Thought" and "Persona-Based" prompting to ensure:
- **Depth**: Detailed explanations, not just bullet points.
- **Tone**: Professional yet empathetic "lead voting consultant" persona.
- **Accuracy**: Specific references to NVSP, Voter Helpline, and state-specific processes.

---

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.
- **AI Engine**: Google Gemini 2.0 for high-speed, high-accuracy generation.
- **Maps**: Google Maps Embed API.
- **Deployment**: Ready for Docker / Google Cloud Run.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Maps API Key
- An OpenRouter or Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adinahawaldar/vote-setu.git
   cd vote-setu
   ```

2. **Setup Environment Variables**:
   Create a `.env` file in the root:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   OPENROUTER_API_KEY=your_key_here
   ```

3. **Install Dependencies**:
   ```bash
   # Root (Frontend)
   npm install

   # Backend
   cd backend
   npm install
   ```

4. **Run the Application**:
   ```bash
   # Terminal 1: Backend
   cd backend
   npm start

   # Terminal 2: Frontend
   npm run dev
   ```

---

##  The "Prompt War" Edge

VoteSetu doesn't just call an API; it orchestrates a specialized environment for the AI. Our system prompts are engineered to:
- **Force Language Consistency**: Ensuring that even complex legal terms are translated accurately within the JSON structure.
- **Eliminate "AI-isms"**: Instructing the model to use long-form paragraphs and natural sentence casing to avoid a robotic feel.
- **Personalization**: Injecting location-specific context (e.g., Mumbai administrative nuances) into the generation pipeline.

---



##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for a stronger democracy.**