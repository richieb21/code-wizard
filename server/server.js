import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai';

import mongoose from 'mongoose';
import Conversation from './models/Conversation.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

mongoose.connect(process.env.MONGODB_URI, {})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connection successfully opened to MongoDB');
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "Hello from CodeWizard",
    })
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.chat.completions.create({
            messages: prompt,
            model: "gpt-3.5-turbo",
          });

        res.status(200).send({
            bot: response.choices[0].message.content
        })
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.post("/title", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const getTitle = await openai.chat.completions.create({
            messages: [{"role":"system","content":"Provide a brief and concise title based on the prompt given by the user"}, prompt[1]],
            model: "gpt-3.5-turbo",
        })

        res.status(200).send({
            title: getTitle.choices[0].message.content,
            example: "example"
        })
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.post("/start-conversation", async(req, res) => {
    try {
        const newConversation = new Conversation({
            title: req.body.title,
            messages: req.body.messages
        })

        const savedConversation = await newConversation.save();
        res.status(201).json({
            convo_id: savedConversation._id
        })
    } catch(error) {
        res.status(500).json({message:error.messsage})
    }
})

app.put('/conversations/:conversationID', async(req, res) => {
    try {
        const { conversationID } = req.params;
        const newMessages = req.body.messages; // Assuming this is an array

        console.log(conversationID);
        console.log(newMessages);

        const conversation = await Conversation.findById(conversationID);
        if (!conversation) {
            return res.status(404).send('Conversation Not Found');
        }

        for (const message of newMessages) {
            conversation.messages.push(message);
        }

        await conversation.save();
        res.status(200).json(conversation);

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
})

app.get('/conversations', async (req, res) => {
    try {
        const conversations = await Conversation.find({}); // Fetch all conversations
        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => console.log('Server is running on port https://localhost:3000'));