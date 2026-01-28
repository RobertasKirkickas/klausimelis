const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware configuration
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data

// Predefined answers
const answers = [
	'Taip, be abejonės.',
	'Tikrai taip.',
	'Beveik garantuota.',
	'Gali tuo pasikliauti.',
	'Galbūt...',
	'Klausk vėliau.',
	'Dabar negaliu atsakyti.',
	'Nesitikėk to.',
	'Mano šaltiniai sako jog ne.',
	'Labai abejotina.',
];

// Endpoint to answer questions
app.post('/api/ask', (req, res) => {
	const { question } = req.body;

	// Check if question exists
	if (!question || question.trim() === '') {
		return res.status(400).json({ error: 'Prašome įrašyti klausimą.' });
	}

	// Pick a random answer
	const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

	// Send response
	setTimeout(() => {
		res.json({ answer: randomAnswer });
	}, 500);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
