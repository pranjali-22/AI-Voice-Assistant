import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";
import "dotenv/config";

const client = new ElevenLabsClient();

async function transcribeAudio() {
    try {
        // Read the audio file
        const audioFile = fs.readFileSync("./luck.mpeg");

        // Use the Eleven Labs API for speech-to-text
        const transcript = await client.speechToText.convert("sk_077b18ed36c88af39b41ba9a573ef5c9980e51e1572650ea", {
            audio: audioFile, // The binary audio file
            model_id: "eleven_multilingual_v2", // Choose the appropriate model
            output_format: "json", // Change the format if needed
        });

        console.log("Transcription:", transcript);
    } catch (error) {
        console.error("Error during transcription:", error.message);
    }
}

transcribeAudio();
