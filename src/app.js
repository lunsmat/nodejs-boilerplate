import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});

export default app;
