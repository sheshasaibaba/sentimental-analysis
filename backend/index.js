import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import axios from 'axios';
import {initializeDatabase, config, sql} from './dbConfig.js';
// initializeDatabase();  // uncomment this line to create the database and tables
await sql.connect(config);
app.use(json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/analyze', async (req, res) => {
    const text = req.body.text
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/sentiment?text=${encodeURIComponent(text)}`, {
            headers: { 'X-Api-Key': 'Zkeh/21BTQIwisPtXj/hWQ==nSOWrNqZ6a9IunHR'},
        });
        await sql.query`USE SentimentAnalysisDB;`;
        await sql.query`INSERT INTO AnalysisReports (UserText, Sentiment, Score) VALUES (${text},${response.data.sentiment},${response.data.score})`
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to analyze sentiment',
            details: error.response?.data || error.message
        });
    }});

    app.get('/getTotalAnalyzedTexts', async (req, res) => {
        try {
            await sql.query`USE SentimentAnalysisDB;`;
            const totalResult = await sql.query`SELECT COUNT(*) as total FROM AnalysisReports`;
            const averageResult = await sql.query`SELECT AVG(Score) as average FROM AnalysisReports`;
            const distributionResult = await sql.query`
                SELECT Sentiment, COUNT(*) as count 
                FROM AnalysisReports 
                GROUP BY Sentiment
            `;
    
            const stats = {
                totalAnalyzedTexts: totalResult.recordset[0].total,
                averageSentimentScore: averageResult.recordset[0].average,
                sentimentDistribution: distributionResult.recordset
            };
            res.json(stats);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});