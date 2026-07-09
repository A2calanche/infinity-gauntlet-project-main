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
⭐ Full-stack productivity app built with the MERN stack (MongoDB, Express, React, Node.js)
   A clean, secure task manager with JWT auth, Google sign-in, Google Calendar sync,
   password recovery, multilingual UI, and personal todos.
</pre>

<img src="https://img.shields.io/badge/-MERN Stack-blue" alt="MERN"/> &nbsp;
<img src="https://img.shields.io/badge/-MongoDB-green" alt="MongoDB"/> &nbsp;
<img src="https://img.shields.io/badge/-JWT Auth-orange" alt="JWT"/> &nbsp;
<img src="https://img.shields.io/badge/-React Router-61DAFB" alt="React Router"/> &nbsp;
<img src="https://img.shields.io/badge/-Google OAuth-4285F4" alt="Google OAuth"/> &nbsp;
<img src="https://img.shields.io/badge/-Google Calendar-4285F4" alt="Google Calendar"/> &nbsp;
<img src="https://img.shields.io/badge/-Multilingual-purple" alt="EN/ES/PT"/> &nbsp;
<img src="https://img.shields.io/badge/-Dark/Light Theme-333" alt="Theming"/> &nbsp;
<img src="https://img.shields.io/badge/-work in progress-FFA500" alt="WIP"/>

<br/>

<h3>🎯 About</h3>
Infinity Gauntlet is a full-stack productivity application that helps you manage tasks with a Kanban-style interface (Pending → Doing → Done). Each user has their own private, secure workspace with JWT authentication. The app supports multiple languages (English, Spanish, Portuguese), includes dark/light theme switching, and can sync individual tasks to Google Calendar.

**Current Features:**
<pre>
✅ Email/password registration and login
✅ Google OAuth sign-in via Google Identity Services
✅ JWT-based authentication for API requests (httpOnly cookies)
✅ Password recovery via email (time-limited, single-use reset tokens)
✅ Google Calendar sync — create, edit, and remove calendar events per task
✅ Todo management with description, edit, delete, and complete actions
✅ Per-user task isolation
✅ Stored todo statuses: pending / doing / done
✅ Multilingual UI (English, Spanish, Portuguese)
✅ Responsive frontend for desktop and mobile
✅ Dark/light theme toggle with OS preference support
✅ Secure password hashing with bcryptjs
✅ Express + MongoDB REST API
🔜 Telegram bot notifications
🔜 Task reminders
</pre>

<h3>🛠️ Tech Stack</h3>

**Frontend**
<pre>
- React 19
- React Router DOM 7
- Create React App with react-scripts
- Sass/SCSS styling
- Context API for language management
- Google Identity Services for OAuth sign-in
- React Icons for UI icons
</pre>

**Backend**
<pre>
- Node.js + Express 5
- MongoDB Atlas / Mongoose
- JWT Authentication
- bcryptjs password hashing
- CORS and Morgan
- google-auth-library for Google token verification
- googleapis for Google Calendar integration
- Nodemailer for password reset emails
- Nodemon for development
</pre>

<h3>📋 Prerequisites</h3>

- Node.js >= 18
- Yarn or npm
- MongoDB Atlas account (free tier available) or MongoDB connection string
- Git
- A Gmail account with an App Password (for sending password reset emails)

<h3>🚀 Getting Started</h3>

**1. Clone the project**

```bash
git clone https://github.com/A2calanche/infinity-gauntlet-project-main.git
cd infinity-gauntlet-project-main
```

**2. Install dependencies**

```bash
# Root dependencies
cd /workspaces/infinity-gauntlet-project-main
yarn install

# Frontend
cd frontend
yarn install

# Backend
cd ../backend
yarn install
```

**3. Configure environment variables**

#### Backend (`backend/.env`)
```bash
MONGO_URI=your-mongodb-connection-string
PORT=8000 or any other you want to use
JWT_SECRET=your-super-secret-random-string
TOEKEN_ENCRYOTION_KEY=<64 CARACTERESS HEX >

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://yourdomain.com:port/v1/calendar/callback
CLIENT_URL=http:http://yourdomain.com:port
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

#### Frontend (`frontend/.env`)
```bash
REACT_APP_API_URL=http://yourdomain.com
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```


#### Generate JWT_SECRET and TOKEN_ENCRYPTION_KEY
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Or if you have openssl:
```bash
openssl rand -hex 32
```
Run it twice — use one output for `TOKEN_ENCRYPTION_KEY` and the other for `JWT_SECRET`.

**note:** Do not use the same string for both variables, if for some reanos, one is compromised, the other stands on

#### **Google OAuth Configuration Steps**

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable required APIs:**
   - Search for "Google+ API" and enable it (for sign-in)
   - Search for "Google Calendar API" and enable it (for calendar sync)

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
     http://localhost:3001/v1/calendar/callback
     https://your-production-domain.com/v1/calendar/callback
     ```
   - Copy the **Client ID** and **Client Secret**

4. **Add credentials to your .env files:**
   - Paste `Client ID` in both `backend/.env` (as `GOOGLE_CLIENT_ID`) and `frontend/.env` (as `REACT_APP_GOOGLE_CLIENT_ID`)
   - Paste `Client Secret` in `backend/.env` (as `GOOGLE_CLIENT_SECRET`)

> The app supports email/password auth without Google OAuth. Google sign-in and Calendar sync are optional but available once configured.

**4. Configure Gmail for password reset emails**

- Enable 2-Step Verification on the Gmail account you'll use
- Generate an [App Password](https://myaccount.google.com/apppasswords)
- Use that App Password (not your regular Gmail password) as `GMAIL_APP_PASSWORD`

**5. Run the project**

**Option A: Start both from root**
```bash
yarn start
```

**Option B: Run separately**
```bash
# Backend
cd backend
yarn start

# Frontend
cd frontend
yarn start
```

The frontend runs at `http://localhost:3000` and the backend API runs at `http://localhost:3001`.

<h3>📁 Project Structure</h3>

```mermaid
flowchart TB
    classDef folder stroke:#818cf8,fill:#eef2ff,stroke-width:2px
    classDef file stroke:#38bdf8,fill:#f0f9ff

    FRONTEND["frontend/"]:::folder --> PUBLIC["public/"]:::folder
    FRONTEND --> SRC["src/"]:::folder

    SRC --> APP["App.js"]:::file
    SRC --> APP_SCSS["App.scss"]:::file
    SRC --> COMPONENTS["components/"]:::folder
    SRC --> CONTEXT["context/"]:::folder
    SRC --> HOOKS["hooks/"]:::folder
    SRC --> LOCALES["locales/"]:::folder
    SRC --> SERVICES["services/"]:::folder

    COMPONENTS --> LANDING["Landing.js"]:::file
    COMPONENTS --> LOGIN["LogIn.js"]:::file
    COMPONENTS --> SIGNIN["SignIn.js"]:::file
    COMPONENTS --> RECOVERY["Recovery.js"]:::file
    COMPONENTS --> RECOVERYPW["RecoveryPassword.js"]:::file
    COMPONENTS --> TODOLIST["TodoList.js"]:::file
    COMPONENTS --> KANBAN["kanban/"]:::folder

    KANBAN --> KBOARD["kanbanBoard.js"]:::file
    KANBAN --> KCOLUMN["kanbanColumn.js"]:::file
    KANBAN --> KCARD["kanbanCard.js"]:::file
    KANBAN --> TODOMODAL["todoModal.js"]:::file
    KANBAN --> TODODETAIL["todoDetailModal.js"]:::file
    KANBAN --> CALEVENT["calendarEventModal.js"]:::file

    CONTEXT --> LANGCTX["LanguageContext.js"]:::file

    HOOKS --> GBTN["useGoogleSignInButton.js"]:::file

    LOCALES --> EN["en.json"]:::file
    LOCALES --> ES["es.json"]:::file
    LOCALES --> PT["pt.json"]:::file

    SERVICES --> CONN["conection.js"]:::file
    BACKEND["backend/"]:::folder --> BSRC["src/"]:::folder

    BSRC --> INDEX["index.js"]:::file
    BSRC --> DBF["db/"]:::folder
    BSRC --> MIDDLE["middlewares/"]:::folder
    BSRC --> MODELS["models/"]:::folder
    BSRC --> ROUTERS["routers/"]:::folder
    BSRC --> UTILS["utils/"]:::folder

    DBF --> DBINDEX["index.js"]:::file

    MIDDLE --> AUTH["auth.js"]:::file
    MIDDLE --> GOOGLE["googleOAuth.js"]:::file
    MIDDLE --> VALIDATOR["validator.js"]:::file

    MODELS --> TODO_M["Todo.js"]:::file
    MODELS --> USERS_M["Users.js"]:::file

    ROUTERS --> AUTH_R["auth-routers.js"]:::file
    ROUTERS --> TODOS_R["to-dos.routers.js"]:::file
    ROUTERS --> CALENDAR_R["calendar-routers.js"]:::file

    UTILS --> MAILER["mailer.js"]:::file
```

<h3>🌍 Multilingual Support</h3>

The UI supports three languages:
- **English** (EN) 🇺🇸
- **Spanish** (ES) 🇲🇽
- **Portuguese** (PT) 🇧🇷

Language selection is available in the top-right selector and is saved to `localStorage`.

<h3>🎨 Themes</h3>

The app includes two themes:
- **Dark Theme** — default based on OS preference
- **Light Theme** — toggleable by the user

Theme selection is available via the sun/moon button in the top-right.

<h3>🔐 Authentication</h3>

**Registration Flow:**
1. User submits name, email, and password
2. Password is hashed with bcryptjs before saving
3. JWT token is created and returned
4. Token is stored in an httpOnly cookie

**Login Flow:**
1. User submits email and password
2. Backend verifies password with bcryptjs
3. JWT token is created and returned
4. Token is used for authenticated requests

**Google Login Flow:**
1. User clicks the Google sign-in button
2. Frontend sends the credential token to `/v1/auth/google`
3. Backend verifies the Google token and creates or reuses the user
4. Backend returns a JWT token for API requests

**Password Recovery Flow:**
1. User requests a reset link from `/forgot-password` with their email
2. Backend generates a random token, stores its hash with a 10-minute expiry, and emails a reset link (the same generic response is returned whether or not the email exists, to avoid leaking which emails are registered)
3. User opens the link (`/reset-password/:token`) and submits a new password
4. Backend validates the token hash and expiry, then updates the password

**Google Calendar Sync Flow:**
1. User clicks "Add to calendar" on a task
2. If Calendar isn't connected yet, the user is redirected to Google's consent screen
3. On approval, Google redirects back to `/v1/calendar/callback` with an authorization code
4. Backend exchanges the code for access/refresh tokens and stores them for the user
5. The user can then create, edit, or remove a calendar event tied to that task

**JWT Token:**
- Payload: `{ id, email }`
- Expiration: 7 days
- Sent via httpOnly cookie, or `Authorization: Bearer {token}` header

<h3>📝 API Endpoints</h3>

**Authentication**
```bash
POST   /v1/auth/register              # Create new user
POST   /v1/auth/login                 # Email/password login
POST   /v1/auth/google                # Google OAuth login
POST   /v1/auth/logout                # Logout
GET    /v1/auth/me                    # Get current authenticated user
POST   /v1/auth/forgot-password       # Request a password reset link
PATCH  /v1/auth/reset-password/:token # Set a new password using a reset token
```

**Todos (requires JWT)**
```bash
GET    /v1/to-dos             # Get todos for current user
POST   /v1/to-dos             # Create a todo
PATCH  /v1/to-dos/:id         # Update todo
DELETE /v1/to-dos/:id         # Delete todo
```

**Calendar (requires JWT, except /callback)**
```bash
GET    /v1/calendar/auth              # Get Google consent URL
GET    /v1/calendar/callback          # OAuth redirect target (Google → backend)
GET    /v1/calendar/status            # Check if the user has Calendar connected
POST   /v1/calendar/event/:todoId     # Create a calendar event for a todo
PATCH  /v1/calendar/event/:todoId     # Update the linked calendar event
DELETE /v1/calendar/event/:todoId     # Remove the linked calendar event
```

<h3>📊 Database Schema</h3>

**User**
```javascript
{
  name: String,
  email: String,
  password: String,
  googleId: String,
  resetTokenHash: String,
  resetTokenExpires: Date,
  googleAccessToken: String,
  googleRefreshToken: String,
  timestamps: true
}
```

**Todo**
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  status: String, // pending | doing | done
  calendarEventId: String,
  calendarSynced: Boolean,
  timestamps: true
}
```

<h3>🔄 Latest Updates</h3>

**July 2026**
- Added password recovery via email (secure, time-limited reset tokens)
- Added Google Calendar sync — create, edit, and delete events per task
- Fixed cookie `sameSite`/`secure` handling for cross-origin (Codespaces) auth
- Completed a full static security review and fixed the findings:
  - `forgot-password` no longer hangs when the email isn't registered
  - Signed and verified the OAuth `state` parameter to prevent CSRF / account-linking attacks
  - Encrypted Google access/refresh tokens at rest (AES-256-GCM)
  - Fixed a `ReferenceError` in the Calendar PATCH route (typo in token refresh handler)
  - Added `ObjectId` validation before Mongo queries to return proper 400s instead of 500s
  - Replaced `||` with `??` in todo updates so fields can be cleared to an empty string
  - Removed duplicate request logging (Morgan + custom middleware)

**June 2026**
- Added secure JWT authentication and per-user todo storage
- Added Google OAuth sign-in with backend token verification
- Added multilingual UI support (EN/ES/PT)
- Added dark/light theme toggle with OS preference support
- Added todo descriptions, edit, delete, and complete actions
- Improved responsive UI and landing page

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

- [ ] Telegram bot notifications
- [ ] Task reminders & notifications
- [ ] Task tags / categories
- [ ] Subtasks
- [ ] Recurring tasks
- [ ] Priority levels
- [ ] Team collaboration
- [ ] Docker containerization
- [ ] CI/CD pipeline

<h3>🤝 Contributing</h3>

Contributions are welcome! Please fork the repository, create a branch, and open a pull request.

<h3>📄 License</h3>

This project is licensed under the MIT License — see the LICENSE file for details.

<h3>👨‍💻 Author</h3>

**Arturo Alejandro Calanche Pino**
- GitHub: [@A2calanche](https://github.com/A2calanche)

---

<p align="center">
  Made with ❤️ and lots of ☕
</p>