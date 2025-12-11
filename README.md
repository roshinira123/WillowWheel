# WillowWheel - Car Insurance Comparison App

WillowWheel is a modern car insurance comparison application built with React and Tailwind CSS. Find the perfect car insurance policy tailored to your needs.

## 🚀 Features

- **Home Page**: Beautiful landing page with mission statement
- **User Authentication**: Login and signup pages
- **Insurance Survey**: Multi-step form to collect driver and vehicle information
- **Quote Results**: Compare insurance quotes from multiple providers
- **Chatbot**: Interactive chat interface for insurance questions
- **Agent Connection**: Connect with insurance experts
- **User Profile**: View and manage your insurance profile

## 📁 Project Structure

```
WillowWheel/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── NavLink.jsx
│   │   ├── MobileNavLink.jsx
│   │   ├── MissionCard.jsx
│   │   ├── TeamMember.jsx
│   │   ├── InsuranceQuote.jsx
│   │   ├── ProfileSection.jsx
│   │   ├── ProfileItem.jsx
│   │   └── ActivityItem.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── GetStartedPage.jsx
│   │   ├── SurveyPage.jsx
│   │   ├── ResultsPage.jsx
│   │   ├── ChatbotPage.jsx
│   │   ├── AgentPage.jsx
│   │   └── ProfilePage.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind CSS imports
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## 📦 Installation

1. **Navigate to the project directory**:
   ```bash
   cd WillowWheel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - React and React DOM
   - Vite (build tool)
   - Tailwind CSS
   - Lucide React (icons)

## 🏃 Running the Application Locally

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   - The terminal will display a local URL (usually `http://localhost:5173`)
   - Open this URL in your web browser
   - The app will automatically reload when you make changes to the code

3. **Build for production** (optional):
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist` folder.

4. **Preview production build** (optional):
   ```bash
   npm run preview
   ```


### Running the Backend

1. **Navigate to the project directory**:
   ```bash
   cd /path/to/WillowWheel
   ```

2. **Set up environment variables**:
   
   Create a `.env` file in the project root with your Cerebras API key:
   ```
   CEREBRAS_API_KEY=your_api_key_here
   ```
   
3. **Install dependencies**:
   ```bash
   python3 -m pip install -r requirements.txt
   ```

4. **Start the backend server**:
   ```bash
   python3 app.py
   ```
   
   You should see output like:
   ```
   * Serving Flask app 'app'
   * Debug mode: on
   * Running on http://127.0.0.1:5001
   Press CTRL+C to quit
   ```

5. **Access the backend**:
   - Local: http://127.0.0.1:5001
   - Network: http://<your_local_ip>:5001

6. **Stopping the server**:
   
   Press `CTRL+C` in the terminal.

**Optional**: If using AI features, ensure your API key is valid; otherwise, the fallback responses will be used.
## 🎨 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🗂️ Component Breakdown

### Components (`src/components/`)
- **Navigation**: Top navigation bar with mobile menu
- **Footer**: Footer component used across pages
- **NavLink**: Desktop navigation link
- **MobileNavLink**: Mobile navigation link
- **MissionCard**: Card displaying mission values
- **TeamMember**: Team member card component
- **InsuranceQuote**: Insurance quote card
- **ProfileSection**: Profile section wrapper
- **ProfileItem**: Individual profile field
- **ActivityItem**: Activity log item

### Pages (`src/pages/`)
- **HomePage**: Landing page with hero section and mission
- **LoginPage**: User login form
- **AboutPage**: About us page with team information
- **GetStartedPage**: User registration form
- **SurveyPage**: Multi-step insurance survey
- **ResultsPage**: Display insurance quotes
- **ChatbotPage**: Interactive chatbot interface
- **AgentPage**: Connect with insurance agent
- **ProfilePage**: User profile dashboard

## 🔧 Configuration Files

- **vite.config.js**: Vite build configuration
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS plugins configuration

## 📱 Pages Overview

1. **Home** (`/`) - Landing page
2. **Login** - User authentication
3. **About Us** - Company information
4. **Get Started** - User registration
5. **Survey** - Insurance information form (5 steps)
6. **Results** - Insurance quotes comparison
7. **Chatbot** - AI assistant chat
8. **Agent** - Connect with human agent
9. **Profile** - User dashboard

## 🐛 Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Dependencies not installing
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

### Styles not loading
Ensure Tailwind CSS is properly configured and `src/index.css` is imported in `main.jsx`.

## 📄 License

This project is part of the WillowWheel insurance comparison platform.

---

Made with ❤️ by Team Car Insurance
