<h2>⚡ Infinity Gauntlet</h2>
<p align="center">
  <img 
    align="center" 
    width="400" 
    height="400" 
    src="./docs/img/fundamentals.png" 
  />
</p>

<pre>
⭐ Full-stack productivity app built with the MERN stack (MongoDB, Express, React 18, Node.js)
   A clean, secure, and intuitive task manager to keep your work organized — wherever you are.
</pre>

<img src="https://img.shields.io/badge/-MERN Stack-blue" alt="MERN"/> &nbsp;
<img src="https://img.shields.io/badge/-MongoDB Atlas-green" alt="MongoDB Atlas"/> &nbsp;
<img src="https://img.shields.io/badge/-JWT Auth-orange" alt="JWT"/> &nbsp;
<img src="https://img.shields.io/badge/-React Router-61DAFB" alt="React Router"/> &nbsp;
<img src="https://img.shields.io/badge/-Google OAuth-4285F4" alt="Google OAuth"/> &nbsp;
<img src="https://img.shields.io/badge/-Multilingual-purple" alt="EN/ES/PT"/> &nbsp;
<img src="https://img.shields.io/badge/-Dark/Light Theme-333" alt="Theming"/> &nbsp;
<img src="https://img.shields.io/badge/-work in progress-FFA500" alt="WIP"/>

<br/>

<h3>🎯 About</h3>

Infinity Gauntlet is a full-stack productivity application that helps you manage tasks with a Kanban-style interface (Pending → Doing → Done). Each user has their own private, secure workspace with JWT authentication. The app supports multiple languages (English, Spanish, Portuguese) and includes dark/light theme switching.

**Current Features:**
<pre>
✅ User registration and login with JWT authentication
✅ Password strength validation (8+ chars, uppercase, number, special char)
✅ Kanban-style to-do list (Pending → Doing → Done columns)
✅ Per-user task isolation and privacy
✅ Dark/Light theme toggle with persistence
✅ Multilingual support (English, Spanish, Portuguese)
✅ Professional landing page with feature showcase
✅ Responsive design (desktop, tablet, mobile)
✅ RESTful API architecture
✅ Password hashing with bcryptjs

🔜 Google OAuth integration
🔜 Telegram bot notifications
🔜 Google Calendar sync
🔜 Password recovery via email
🔜 Task reminders
</pre>

<h3>🛠️ Tech Stack</h3>

**Frontend**
<pre>
- React 18+
- React Router DOM 7
- Sass/SCSS (with mixins & variables)
- Context API (language management)
- Responsive CSS Grid
- Dark/Light theme with CSS variables
</pre>

**Backend**
<pre>
- Node.js 18+
- Express 5
- MongoDB Atlas + Mongoose 8
- JWT Authentication
- bcryptjs (password hashing)
- CORS
- Morgan (logging)
- Nodemon (development)
</pre>

<h3>📋 Prerequisites</h3>

- Node.js >= 16
- Yarn or npm
- MongoDB Atlas account (free tier available)
- Git

<h3>🚀 Getting Started</h3>

**1. Clone the project**

```bash
git clone https://github.com/A2calanche/infinity-gauntlet.git
cd infinity-gauntlet
```

**2. Install dependencies**

From the root folder:
```bash
yarn install
cd frontend && yarn install
cd ../backend && yarn install
cd ..
```

Or separately:
```bash
# Frontend
cd frontend
yarn install

# Backend (in another terminal)
cd backend
yarn install
```

**3. Configure environment variables**

#### **Backend (.env file in `backend/` folder):**
```bash
MONGO_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/infinity-gauntlet
PORT=3001
JWT_SECRET=your-super-secret-random-string-here
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Google OAuth - Get these from Google Cloud Console
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
```

#### **Frontend (.env file in `frontend/` folder):**
```bash
REACT_APP_API_URL=http://localhost:3001

# Google OAuth - Same CLIENT_ID as Backend (must start with REACT_APP_ for Create React App)
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

#### **Google OAuth Configuration Steps**

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable Google+ API:**
   - Search for "Google+ API" in the search bar
   - Click "Enable"

3. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add Authorized JavaScript origins:
     ```
     http://localhost:3000
     http://localhost:3001
     https://your-production-domain.com
     ```
   - Add Authorized redirect URIs:
     ```
     http://localhost:3001/auth/google/callback
     https://your-production-domain.com/auth/google/callback
     ```
   - Copy the **Client ID** and **Client Secret**

4. **Add credentials to your .env files:**
   - Paste `Client ID` in both `backend/.env` (as `GOOGLE_CLIENT_ID`) and `frontend/.env` (as `REACT_APP_GOOGLE_CLIENT_ID`)
   - Paste `Client Secret` in `backend/.env` (as `GOOGLE_CLIENT_SECRET`)

**4. Run the project**

**Option A: Run both from root (recommended)**
```bash
yarn start
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd backend
yarn start

# Terminal 2 - Frontend  
cd frontend
yarn start
```

The frontend will open at `http://localhost:3000` and the backend API will run on `http://localhost:3001`.

<h3>📁 Project Structure</h3>

```bash
infinity-gauntlet/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── index.js                 # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js                  # User schema
│   │   │   └── Todo.js                  # Todo schema
│   │   ├── middlewares/
│   │   │   ├── auth.js                  # JWT verification
│   │   │   └── validator.js             # Request validation
│   │   ├── routers/
│   │   │   ├── auth-routers.js          # Login/Register endpoints
│   │   │   └── to-dos.routers.js        # Todo CRUD endpoints
│   │   └── index.js                     # Express server setup
│   ├── .env                             # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.js               # Public landing page
│   │   │   ├── LogIn.js                 # Login form
│   │   │   ├── SignIn.js                # Registration form
│   │   │   ├── TodoList.js              # Main todo list view
│   │   │   ├── Todo.js                  # Single todo item
│   │   │   ├── TodoForm.js              # Todo creation form
│   │   │   └── conection.js             # API service layer
│   │   ├── context/
│   │   │   └── LanguageContext.js       # Language/i18n management
│   │   ├── locales/
│   │   │   ├── en.json                  # English translations
│   │   │   ├── es.json                  # Spanish translations
│   │   │   └── pt.json                  # Portuguese translations
│   │   ├── App.js                       # Main app with routing
│   │   ├── App.scss                     # Global styles & themes
│   │   └── index.js                     # React entry point
│   ├── public/
│   │   └── index.html
│   ├── .env                             # Environment variables
│   └── package.json
│
├── docs/
│   └── img/
│       └── fundamentals.png             # Project logo
├── package.json                         # Root package (concurrently)
├── .gitignore
├── LICENSE                              # MIT License
└── README.md                            # This file
```

<h3>🌍 Multilingual Support</h3>

The app supports three languages:
- **English** (EN) 🇺🇸
- **Spanish** (ES) 🇲🇽
- **Portuguese** (PT) 🇧🇷

Switch languages using the selector in the top-right corner. Your preference is saved to localStorage.

<h3>🎨 Themes</h3>

The app includes two beautiful themes:
- **Dark Theme** (default) — Purple & deep grays
- **Light Theme** — Blue & soft whites

Toggled via the sun/moon icon in the top-right corner. Your preference is saved to localStorage.

<h3>🔐 Authentication</h3>

**Registration Flow:**
1. User creates account with email and password
2. Password is hashed with bcryptjs (12 rounds)
3. JWT token issued upon success
4. Token stored in localStorage

**Login Flow:**
1. User enters email and password
2. Password compared with hashed version
3. JWT token issued if valid
4. Token used for all authenticated requests

**JWT Token:**
- Payload: `{ id, email }`
- Expiration: 7 days
- Stored in `Authorization: Bearer {token}` header

<h3>📝 API Endpoints</h3>

**Authentication**
```bash
POST   /v1/auth/register          # Create new user
POST   /v1/auth/login             # User login
```

**Todos (requires JWT)**
```bash
GET    /v1/to-dos                 # Get all todos for logged-in user
POST   /v1/to-dos                 # Create new todo
PATCH  /v1/to-dos/:id             # Update todo
DELETE /v1/to-dos/:id             # Delete todo
```

<h3>📊 Database Schema</h3>

**User**
```javascript
{
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  googleId: String (null by default),
  timestamps: true
}
```

**Todo**
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  is_done: Boolean (default: false),
  status: enum ['pending', 'doing', 'done'] (default: 'pending'),
  timestamps: true
}
```

<h3>🔄 Latest Updates</h3>

**June 2026**
- Upgraded React from 17 → 18
- Migrated to React Router 7 for client-side routing
- Added professional landing page
- Implemented multilingual support (EN/ES/PT)
- Converted CSS to Sass/SCSS with mixins and maps
- Refactored authentication flow
- Added password strength validation
- Improved responsive design
- Enhanced dark/light theme system

**Previous (2025)**
- Migrated database from SQLite → MongoDB Atlas
- Added JWT authentication
- Implemented per-user task isolation
- Added dark/light theme toggle
- Built RESTful API architecture

**Original (2023)**
- Basic CRUD to-do list
- SQLite database
- Express REST API
- React frontend

<h3>🛣️ Roadmap</h3>

- [ ] Google OAuth integration
- [ ] Telegram bot notifications
- [ ] Google Calendar sync
- [ ] Email-based password recovery
- [ ] Task reminders & notifications
- [ ] Task tags/categories
- [ ] Subtasks
- [ ] Recurring tasks
- [ ] Task priority levels
- [ ] Team collaboration features
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)

<h3>🤝 Contributing</h3>

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes proper error handling.

<h3>📄 License</h3>

This project is licensed under the MIT License — see the LICENSE file for details.

<h3>👨‍💻 Author</h3>

**Arturo Alejandro Calanche Pino**
- GitHub: [@A2calanche](https://github.com/A2calanche)
- Location: Manaus, Brazil 🇧🇷

---

<p align="center">
  Made with ❤️ and lots of ☕
</p>