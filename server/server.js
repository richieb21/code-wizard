import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

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
            messages: [
              { "role": "system", "content": "You are an expert in coding and programming and are giving advice for code related questions" },
              { "role": "user", "content": `${prompt}`}
            ],
            model: "gpt-3.5-turbo",
          });

          console.log(response.choices[0])

        res.status(200).send({
            bot: response.choices[0].message.content
        })
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.listen(3000, () => console.log('Server is running on port https://localhost:3000'));