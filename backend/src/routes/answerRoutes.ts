import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY // Load API key from the environment variables
});
const router = express.Router();

router.get('/answer', async (req: Request, res: Response) => {

    try {
        const contents = [
            { text: "Summarize this document" },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(fs.readFileSync("./src/pdfs/example.pdf")).toString("base64")
                }
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });
        console.log(response.text);
        res.status(200).json({summary:response.text});
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
