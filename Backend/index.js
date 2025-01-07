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

// Endpoint to handle messages
app.post('/api/bot', async (req, res) => {
    const { message } = req.body;

    const flowIdOrName = '37941ca5-0ed3-4642-873f-5d179bf3244d';
    const langflowId = 'e0b69fd6-af76-4a00-b361-20fd2926e36a';

    try {
        const tweaks = {
            "File-hTUPs": {},
            "SplitText-XGqiS": {},
            "AstraDB-B2cmD": {},
            "Google Generative AI Embeddings-imWFu": {},
            "ChatInput-r79eh": {},
            "AstraDB-7tqxC": {},
            "Google Generative AI Embeddings-RogHS": {},
            "ParseData-wu78L": {},
            "GoogleGenerativeAIModel-siFyC": {},
            "Prompt-VKcxw": {},
            "ChatOutput-Xl3ZT": {}
        };

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            message,
            "chat", // inputType
            "chat", // outputType
            tweaks,
            false, // stream
            (data) => console.log("Stream Update:", data), // onUpdate (not used here)
            (message) => console.log("Stream Closed:", message), // onClose
            (error) => console.error("Stream Error:", error) // onError
        );

        if (response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const chatbotMessage = firstComponentOutputs.outputs.message.text;

            return res.status(200).json({ message: chatbotMessage });
        } else {
            return res.status(500).json({ error: "Unexpected response format from Langflow" });
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
