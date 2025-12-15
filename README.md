# AI Voice Customer Service Agent

Demo Video: https://www.youtube.com/watch?v=N-Cv85I0CmU

A real-time voice-enabled AI customer service web application that allows users to call and speak with an AI agent to get questions answered about their account. The system is designed for low-latency voice interactions, follows company guidelines using Retrieval-Augmented Generation (RAG), and provides an admin dashboard for monitoring call analytics and user trends.

---

## Features

- Voice-based web calling interface for interacting with an AI customer service agent  
- Real-time speech-to-text and text-to-speech for natural conversations  
- RAG-based responses that follow company policies and reference user account data  
- Context-aware multi-turn conversations  
- Admin dashboard for call analytics and common question insights  

---

## Tech Stack

- Frontend: Next.js, TypeScript, React  
- Backend: API Routes / Server Functions  
- Speech-to-Text: Deepgram  
- Voice Agent Platform: Vapi  
- AI Reasoning: Large Language Model with RAG  
- RAG: Vector database with company knowledge base and user account data  
- Analytics: Call logs, transcripts, and aggregated metrics  

---

## Technical Implementation

### Voice Call Flow
- User initiates a call from the web interface  
- Audio streaming and call orchestration handled by Vapi  
- Speech is transcribed in real time using Deepgram  
- Transcripts are sent to the AI reasoning layer  
- AI-generated responses are converted to speech via Vapi  
- Audio is streamed back to the user with minimal latency  

---

### AI Reasoning and RAG
- User queries are enriched with company guidelines and account-specific data  
- Relevant documents are retrieved from a vector database using semantic search  
- Retrieved context is injected into system prompts before response generation  
- Ensures responses are policy-compliant, accurate, and personalized  

---

### Knowledge Base Management
- Company FAQs, policies, and documentation are chunked and embedded  
- Embeddings are stored in a vector database for efficient retrieval  
- Knowledge base updates do not require application redeployment  

---

### Conversation State Management
- Maintains session-level conversational context per call  
- Supports follow-up questions and clarifications  
- Handles interruptions and incomplete user input gracefully  

---

### Admin Dashboard
- Displays total calls, average call duration, and usage trends  
- Aggregates and ranks frequently asked questions  
- Provides insights into AI agent performance and knowledge coverage  

---
