# 🌟 🔍 GitSight – AI GitHub Profile Analyzer Powered by Gemini



- GitSight is a powerful, full-stack generative AI web app that analyzes any public GitHub profile and delivers a deep, structured report of technical strengths, gaps, contributions, and actionable improvements — all with just a username input.

- Powered by Google Gemini via Firebase Genkit, GitSight delivers instant results inside a sleek and responsive interface using Next.js and ShadCN UI.


## 📋 Table of Contents
- Introduction
- Features
- Project Implementation Process
- File Structure
- Technology Stack
- Installation
- Usage
- Screenshots
- Contributing
- License
- Contact

## 📘 Introduction

- GitSight transforms the way developers, recruiters, and hiring managers evaluate GitHub profiles.
- Instead of skimming through dozens of repositories manually, GitSight uses Gemini AI to analyze:
- Key strengths and improvement areas
- Profile completeness and activity
- Code quality, repo visibility, and more
- All without logging in — just enter a GitHub username and get instant insights


## ✨ Features

🧠 AI-Powered Technical Analysis
→ Get a comprehensive summary of GitHub profile strengths, weaknesses, and tips.

📊 Scored Metrics Dashboard
→ See AI-calculated scores for Repository Quality, Profile Completion, Community Engagement, and more.

📆 Contribution Calendar Heatmap
→ Visualize yearly activity with interactive graphs.

📌 Pinned Repo Analysis
→ Get Gemini-generated reviews and improvement tips on top pinned repositories.

📚 Language Distribution Chart
→ Discover most-used languages across public repositories.

💡 Tailored Suggestions
→ Receive actionable recommendations personalized to the user’s GitHub style.

🎨 Modern UI + Dark Mode
→ Responsive, clean design with gradient cards, transitions, and both light/dark themes.

🔐 No Login Required
→ Enter any public GitHub username to get a report instantly — no authentication needed.

## 🛠 Project Implementation Process

#### 1. Input Flow
- Enter a GitHub username
- Submit to trigger data fetching and AI prompt
- Wait for AI analysis results

#### 2. AI Content Generation
- AI logic defined in generate-analysis.ts using Genkit + Gemini
- Fetches GitHub profile data using GitHub GraphQL API
- AI interprets and scores data, returns structured JSON

#### 3. UI/UX Highlights
- Built with App Router (Next.js 15)
- Uses ShadCN and Tailwind for elegant UI
- Animations, loading skeletons, and responsive layout
- Fully mobile-friendly with error states and reset capability


## 📁 File Structure

```bash
gitsight/
├── src/
│   ├── app/                     # App Router pages, layouts
│   ├── components/             # UI components (charts, cards, layout)
│   ├── ai/
│   │   ├── flows/
│   │   │   └── generate-analysis.ts # Core Genkit AI logic
│   │   ├── genkit.ts               # Genkit + Gemini configuration
│   ├── lib/                     # GitHub API helpers, scoring utils
│   ├── hooks/                   # Custom React hooks
│   └── types/                   # Zod schemas and TypeScript types
├── public/                      # Static assets (images, icons)
├── .env                         # GitHub token for API access
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind theme config
└── README.md

```

## 💻 Technology Stack

Category	Tech Used

🧠 AI Engine	Firebase Genkit + Google Gemini

⚛️ Frontend	Next.js 15 (App Router), React 18

🎨 Styling	Tailwind CSS, ShadCN UI

🔠 Language	TypeScript

🔗 API	GitHub GraphQL API

✅ Validation	Zod

🧪 State	React Hooks

🚀 Deployment	Firebase App Hosting


## 🛠 Installation

Follow these steps to set up and run the Techny project locally:

#### 1. Clone the repository

```bash
git clone https://github.com/RohanShrivastava08/gitsight.git
cd gitsight
```

#### 2. Install dependencies

```bash
npm install
# or
yarn install
```

#### 3. Set Up Environment Variables

- Create a .env.local file in the root:

```bash
GOOGLE_API_KEY=your_google_ai_api_key
```

Get your API key at: Google AI Studio

#### 4. Run Genkit (AI server)

```bash
npm run genkit:dev
# or for hot reload
npm run genkit:watch
```

### 5. Run the app

```bash
npm run dev
```
Visit: http://localhost:9002

## 🚀 Usage
- Enter any GitHub username
- Click Analyze Profile
- Wait for AI to fetch and analyze the data
- Review insights: scores, repo tips, activity, and language usage
- Click Reset to try another profile

🧠 AI Flows

Feature	AI Flow	Input Type	Output

GitHub Analysis	generate-analysis.ts	Username (text)	Full 
insight report (JSON)


## 📸 Screenshots



## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
git checkout -b feature/YourFeature
```

- Commit your changes:
```bash
git commit -m 'Add your feature'
```

- Push to the branch:
```bash
git push origin feature/YourFeature
```

- Open a pull request with detailed explanations of your changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
