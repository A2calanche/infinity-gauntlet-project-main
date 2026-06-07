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
⭐ Full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js)
   Originally developed as a fundamentals final project, now being expanded and improved.
</pre>

<img src="https://img.shields.io/badge/-MERN Stack-blue" alt="MERN"/> &nbsp;
<img src="https://img.shields.io/badge/-MongoDB Atlas-green" alt="MongoDB Atlas"/> &nbsp;
<img src="https://img.shields.io/badge/-JWT Auth-orange" alt="JWT"/> &nbsp;
<img src="https://img.shields.io/badge/-Google OAuth-red" alt="Google OAuth"/> &nbsp;
<img src="https://img.shields.io/badge/-Telegram Bot-blue" alt="Telegram"/> &nbsp;
<img src="https://img.shields.io/badge/-work in progress-orange" alt="WIP"/>

<br/>

<h3>:eye_speech_bubble: Live demo</h3>

Coming soon.

<h3>:bulb: About</h3>

Infinity Gauntlet is a productivity app that lets you manage your tasks with a Kanban-style to-do list (Pending → Doing → Done), receive reminders via Telegram, and sync tasks with Google Calendar. Built with a RESTful API architecture covering both frontend and backend.

<strong>Features:</strong>
<pre>
✅ User registration and login with JWT authentication
✅ Google OAuth integration
✅ Kanban-style to-do list (Pending → Doing → Done)
✅ Each user manages their own private task list
✅ Telegram bot notifications and reminders
🔜 Google Calendar integration
🔜 Slack integration
</pre>

<h3>:hammer: Tech Stack</h3>

<strong>Frontend</strong>
<pre>
- React 17
- React Router DOM 7
- CSS Variables (dark/light theme)
- Responsive design
</pre>

<strong>Backend</strong>
<pre>
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs
- Morgan
- Nodemon
</pre>

<h3>:books: Getting started</h3>

<strong>Prerequisites:</strong>
- Node.js >= 16
- Yarn
- MongoDB Atlas account
- Telegram Bot Token (optional)

<strong>1. Clone the project</strong>

```bash
git clone https://github.com/A2calanche/infinity-gauntlet.git
cd infinity-gauntlet
```


<strong> 2. Install dependencies</strong>
 <p><b>Frontend</b><p>


```bash
cd frontend
yarn install
```

<p><b>Backend</b></p>

```bash
cd backend 
yarn install
```
<strong>3. Configure environment variables</strong>
<p><b>Create a .env file in the backend/ folder:</b></p>

```bash
MONGO_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/infinity-gauntlet
PORT=3001
JWT_SECRET=your-random-secret-here
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-chat-id
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

<p><b>Create a .env file in the frontend/ folder:</b></p>

```bash
REACT_APP_API_URL=http://localhost:3001
```
<strong>4. Run the project<strong>
<p>
can run separately or together from main folder

</p>

``` bash
# Terminal 1 - Backend
cd backend
yarn start

# Terminal 2 - Frontend
cd frontend
yarn start
```
```bash
# Install concurrently first (only once)
yarn add concurrently --dev

# Then run on the root folder 
yarn start
```
<strong> make sure your root folder package.json has: </strong>

```bash
{
  "scripts": {
    "start": "concurrently \"yarn --cwd frontend start\" \"yarn --cwd backend start\""
  }
}
```
<h3>:file_folder: Project structure</h3>
```bash
infinity-gauntlet/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LogIn.js
│   │   │   ├── SignIn.js
│   │   │   ├── TodoList.js
│   │   │   ├── Todo.js
│   │   │   ├── TodoForm.js
│   │   │   └── connection.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Todo.js
│   │   ├── routers/
│   │   │   ├── auth-routers.js
│   │   │   └── to-dos.routers.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   └── validator.js
│   │   ├── db/
│   │   │   └── index.js
│   │   └── index.js
│   └── package.json
└── README.md
```