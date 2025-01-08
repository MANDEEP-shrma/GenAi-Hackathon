const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const LangflowClient = require('./bot'); // Assuming you exported LangflowClient class from BotApi.js

const app = express();
const port = 5000; // Backend runs on this port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Application token and Langflow details
const applicationToken = "AstraCS:eRIbAZUzOhvlDLZlFonaZPav:6363a7849b38dd1d229e9390cc6e7c28377bb23609ab32bc42660a6da4e9d7d2"; // Add your application token here
const langflowClient = new LangflowClient(
    'https://api.langflow.astra.datastax.com',
    applicationToken
);


app.post('/api/bot', async (req, res) => {
    const flowIdOrName = '37941ca5-0ed3-4642-873f-5d179bf3244d';
    const langflowId = 'e0b69fd6-af76-4a00-b361-20fd2926e36a';
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
        console.log("Langflow Response:", response.outputs[0].outputs[0].artifacts.message);

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



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
