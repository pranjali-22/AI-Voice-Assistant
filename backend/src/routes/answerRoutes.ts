import express, { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY // Load API key from the environment variables
});
const router = express.Router();
router.post('/typeofQuery', async (req: any, res: any) => {
    const userQuery = req.body.question; // Ensure query is passed as part of the body
    if (!userQuery) {
        return res.status(400).json({ error: "Missing 'question' parameter." });
    }

    try {
        const contents = [
            { text: `I want to know what type of query this is. Here is the query: ${userQuery}. Answer should be one word.
            1. orderDetails - if the user wants to know about the order
            2. orderCreate - if the user wants to create a new order
            3. accountUpdate - if the user wants to update their account
            4. accountDetails - if the user wants to know about their account
            5. general - if it's anything else
            Do not add \n in the word. Just give the answer from either orderDetails, orderCreate, accountUpdate, accountDetails, or general.
            The questions are going to be read by a voice assistant so do not use special characters such as '/', '*', or others that might break the voice assistant.` }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });

        console.log(response.text); // Log AI's response for debugging
        res.status(200).json({ typeOfQuery: response.text?.trim() }); // Send the type of query response
    } catch (error) {
        console.error('Error fetching query type:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/generalAnswer', async (req: any, res: any) => {
    const question = req.body.question; // Assuming the question is passed as a query parameter
    console.log(question)

    if (!question) {
        return res.status(400).json({ error: "Missing 'question' parameter." });
    }

    try {
        const contents = [
            {
                text: `Answer this question after reading the pdf. The question is: "${question}". Please provide the answer. The answer will be read by a voice ai agent so do not include any special characters. only include words`
            },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(fs.readFileSync("./src/pdfs/DELIVERY.pdf")).toString("base64")
                }
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });

        console.log('Generated Answer:', response.text);
        res.status(200).json({ answer: response.text });
    } catch (error) {
        console.error('Error fetching answer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;
