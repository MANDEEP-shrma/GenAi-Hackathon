const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const LangflowClient = require("./bot"); // Assuming you exported LangflowClient class from BotApi.js
const path = require("path");
require("dotenv").config();

const app = express();
const port = 5000; // Backend runs on this port

// Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from the specific frontend URL or no origin (e.g., for Postman)
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "dist")));

app.options("*", cors());
// Application token and Langflow details
const applicationToken =
  "AstraCS:kXzZWKBZulxIEMxNmckHpPpl:1c922838b3974267497b9731aa14af8d994a83eac7c48dad42614ee48249fdc8";

const langflowClient = new LangflowClient(
  "https://api.langflow.astra.datastax.com",
  applicationToken
);

// Backend API route
app.post("/api/bot", async (req, res) => {
  const flowIdOrName = "37941ca5-0ed3-4642-873f-5d179bf3244d";
  const langflowId = "e0b69fd6-af76-4a00-b361-20fd2926e36a";
  const tweaks = {};

  try {
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      req.body.message,
      "chat",
      "chat",
      tweaks,
      false
    );
    console.log(response);
    console.log(
      "Langflow Response:",
      response.outputs[0].outputs[0].artifacts.message
    );

    if (response?.outputs?.length) {
      const chatbotMessage = response.outputs[0].outputs[0].artifacts.message;
      return res.status(200).json({ message: chatbotMessage });
    } else {
      return res.status(500).json({ error: "Invalid response format." });
    }
  } catch (error) {
    console.error("Error in API Handler:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(process.env.FRONTEND_URL);
  console.log(`Server running at http://localhost:${port}`);
});
