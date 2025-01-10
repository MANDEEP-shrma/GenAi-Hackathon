// Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;

    console.log("Request URL:", url);
    console.log("Request Headers:", headers);
    console.log("Request Body:", JSON.stringify(body));

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      console.log("Raw Response Status:", response.status);
      const rawText = await response.text(); // Read the raw text
      console.log("Raw Response Text:", rawText);

      try {
        const responseMessage = JSON.parse(rawText); // Parse the raw text manually
        if (!response.ok) {
          throw new Error(
            `${response.status} ${response.statusText} - ${JSON.stringify(
              responseMessage
            )}`
          );
        }

        console.log("Parsed Response JSON:", responseMessage);
        return responseMessage;
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError.message);
        throw new Error(`Failed to parse response body: ${rawText}`);
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      throw error;
    }
  }

  async initiateSession(
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks,
    });
  }

  handleStream(streamUrl, onUpdate, onClose, onError) {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = (event) => {
      console.error("Stream Error:", event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose("Stream closed");
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(
    flowIdOrName,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false,
    onUpdate,
    onClose,
    onError
  ) {
    try {
      const initResponse = await this.initiateSession(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType,
        outputType,
        stream,
        tweaks
      );
      console.log("Init Response:", initResponse);
      if (
        stream &&
        initResponse &&
        initResponse.outputs &&
        initResponse.outputs[0].outputs[0].artifacts.stream_url
      ) {
        const streamUrl =
          initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error("Error running flow:", error);
      onError("Error initiating session");
    }
  }
}

async function main(
  inputValue,
  inputType = "chat",
  outputType = "chat",
  stream = false
) {
  const flowIdOrName = "37941ca5-0ed3-4642-873f-5d179bf3244d";
  const langflowId = "e0b69fd6-af76-4a00-b361-20fd2926e36a";
  const applicationToken = process.env.APPLICATION_URL;
  const langflowClient = new LangflowClient(
    "https://api.langflow.astra.datastax.com",
    applicationToken
  );

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
      "ChatOutput-Xl3ZT": {},
    };
    response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue,
      inputType,
      outputType,
      tweaks,
      stream,
      (data) => console.log("Received:", data.chunk), // onUpdate
      (message) => console.log("Stream Closed:", message), // onClose
      (error) => console.log("Stream Error:", error) // onError
    );
    if (!stream && response && response.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      const output = firstComponentOutputs.outputs.message;

      console.log("Final Output:", output.message.text);
    }
  } catch (error) {
    console.error("Main Error", error.message);
  }
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error(
    'Please run the file with the message as an argument: node <YOUR_FILE_NAME>.js "user_message"'
  );
}
main(
  args[0], // inputValue
  args[1], // inputType
  args[2], // outputType
  args[3] === "true" // stream
);

// At the end of your file:
module.exports = LangflowClient;
