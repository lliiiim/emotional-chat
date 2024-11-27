require('dotenv').config();
const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');
const EMOTION_TYPES = require('./emotion_prompt');

const app = express();
app.use(cors());
app.use(express.json());

// API Key
const OPENAPI_KEY = process.env.OPENAPI_KEY;
const openai = new OpenAI({apiKey : OPENAPI_KEY});

app.post('/chat', async(req, res) => {
    try{
        const {msg, emotion} = req.body
        // console.log('req.body',msg, emotion)
        // const reply = {hi : 'test'};
        // res.status(200).json({reply});
        // res.send(reply)
        // const reply = { content : '안녕 난 gpt얌'};
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: EMOTION_TYPES.emotion },
                {
                    role: 'user',
                    content: msg,
                },
            ],
        });
        console.log(completion.choices[0].message);
        const reply = completion.choices[0].message;
        res.status(200).json({reply});
    }catch(e){
        res.status(400).json({error : 'api request fail', rawError : error});
    }
})

app.listen(8007, () => {
    console.log('server is running on 8007');
});