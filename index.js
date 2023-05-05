const PORT = 8000;
import express from 'express';
const app = express();
import cors from 'cors';
// import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

app.get('/keys', (req, res) => {
    res.json(firebaseConfig);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });