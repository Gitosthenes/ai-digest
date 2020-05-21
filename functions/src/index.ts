import * as functions from 'firebase-functions';
import * as express from 'express';
import * as path from 'path';

const app = express();
require('dotenv').config({path: path.join(__dirname, '../../.env')});

app.get('/helloWorld', (req: express.Request, res: express.Response) => {
    res.send('Hello World');
});

app.get('/summarize', (req: express.Request, res: express.Response) => {
    const smmry = require('smmry')({
        SM_API_KEY: process.env.SM_API_KEY
    });

    const testURL = `https://www.npr.org/sections/alltechconsidered/2016/12/05/503581220/fake-or-real-how-to-self-check-the-news-and-get-the-facts`

    smmry.summarizeUrl(testURL)
        .then((data: string) => {
            res.send(data);
        })
        .catch((err: string) => {
            res.send(err);
        });
});

export const api = functions.https.onRequest(app);