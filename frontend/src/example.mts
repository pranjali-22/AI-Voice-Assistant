import { ElevenLabsClient, play } from "elevenlabs";
import "dotenv/config";

const client = new ElevenLabsClient();
const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
    text: "The first move is what sets everything in motion.",
    model_id: "eleven_multilingual_v2",
    output_format: "mp3_44100_128",
});
console.log("hereugferugfieu")
await play(audio);
