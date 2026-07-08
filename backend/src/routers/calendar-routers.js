import express from "express";
import { google } from "googleapis";
import { authMiddleware } from "../middlewares/auth.js";
import { User } from "../models/Users.js";
import { Todo } from "../models/Todo.js";

export const CalendarRouter = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

// GET /v1/calendar/auth — genera el link de autorización
CalendarRouter.get("/auth", authMiddleware, (req, res) => {
  const state = jwt.sign(
    { userId: req.user.id },
    process.env.JWT_SECRET,
    { expiresIn: "10m" })

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    state,
  });
  res.json({ url });
});

// GET /v1/calendar/callback — Google redirige aquí con el code
CalendarRouter.get("/callback", async (req, res) => {
  try {
    const { code, state } = req.query;

    let userId;
    try {
      const decoded = jwt.verify(state, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch {
      return res.redirect(`${process.env.CLIENT_URL}/app?calendarConnected=false`);
    }

    const { tokens } = await oauth2Client.getToken(code);

    await User.findByIdAndUpdate(userId, {
      googleAccessToken: tokens.access_token,
      googleRefreshToken: tokens.refresh_token || undefined,
    });

    res.redirect(`${process.env.CLIENT_URL}/app?calendarConnected=true`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.CLIENT_URL}/app?calendarConnected=false`);
  }
});

// POST /v1/calendar/event/:todoId — crea el evento en Google Calendar
CalendarRouter.post("/event/:todoId", authMiddleware, async (req, res) => {
  try {
    const { todoId } = req.params;
    const { startDateTime, endDateTime } = req.body;

    const user = await User.findById(req.user.id);
    if (!user.googleAccessToken) {
      return res.status(403).json({ message: "Google Calendar not connected" });
    }

    const todo = await Todo.findOne({ _id: todoId, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    oauth2Client.setCredentials({
      access_token:  user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
    });



    // refresca el token automáticamente si expiró
    oauth2Client.on("tokens", async (tokens) => {
      if (tokens.access_token) {
        await User.findByIdAndUpdate(req.user.id, {
          googleAccessToken: tokens.access_token,
        });
      }
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const start = new Date(startDateTime).toISOString();
    const end = new Date(endDateTime).toISOString();
    if(isNaN(new Date(startDateTime))|| isNaN(new Date(endDateTime))) {
        return res.status(400).json({ message: "Invalid date format" });
}

    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary:     todo.title,
        description: todo.description,
        start: { dateTime: start , timeZone: "America/Manaus" },
        end:   { dateTime: end ,   timeZone: "America/Manaus" },
      },
    });

    // guardamos el eventId en el todo
    todo.calendarEventId = event.data.id;
    todo.calendarSynced  = true;
    await todo.save();
    res.json({ message: "Event created", eventId: event.data.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create calendar event", error: error.message });
  }
});
//PATCH /v1/calendar/event/:todoId - actualiza el evento en Google Calendar
CalendarRouter.patch("/event/:todoId", authMiddleware, async (req, res) => {
  try {
    const { todoId } = req.params;
    const { startDateTime, endDateTime } = req.body;

    const user = await User.findById(req.user.id);
    if (!user.googleAccessToken) {
      return res.status(403).json({
        message: "google calendar not connected"
      });
    }

    const todo = await Todo.findOne({ _id: todoId, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (!todo.calendarEventId) {
      return res.status(400).json({
        message: "No calendar event linked to this todo"
      });
    }

    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken
    });

    oauth2Client.on("tokens", async (tokens) => {
      if (tokens.access_token) {           
        await User.findByIdAndUpdate(req.user.id, {
          googleAccessToken: tokens.access_token
        });
      }
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client
    });

    await calendar.events.patch({
      calendarId: "primary",
      eventId: todo.calendarEventId,
      requestBody: {
        start: { dateTime: startDateTime, timeZone: "America/Manaus" },
        end:   { dateTime: endDateTime,   timeZone: "America/Manaus" },
      },
    });

    res.json({ message: "Event Updated Successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update calendar event", error: error.message });
  }
});

//DELETE v1/calendar/event/:todoId - elimina el evento de google calendar
CalendarRouter.delete("/event/:todoId", authMiddleware, async (req, res) => {
  try{
    const { todoId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user.googleAccessToken) {
    return res.status(403).json({
      message: "google calendar not connected"
    });
  }

   const todo = await Todo.findOne({ _id: todoId, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ 
        message: "Todo not found" });
    }
    if(!todo.calendarEventId) {
      return res.status(400).json({
        message: "No calendar event linked to this todo"
      });
    }
    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken
    });
    oauth2Client.on("tokens", async (tokens) => {
      if (tokens.access_token) {
        await User.findByIdAndUpdate(req.user.id, {
          googleAccessToken: tokens.access_token,
        });
      }
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    await calendar.events.delete({
      calendarId: "primary",
      eventId: todo.calendarEventId,
    });

    todo.calendarEventId = null;
    todo.calendarSynced  = false;
    await todo.save();

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete calendar event", error: error.message });
  }
});

// GET /v1/calendar/status — verifica si el usuario tiene Calendar conectado
CalendarRouter.get("/status", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ connected: !!user.googleAccessToken });
  } catch (error) {
    res.status(500).json({ message: "Error checking calendar status" });
  }
});
