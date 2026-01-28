import { useState } from 'react';
import './App.css';

function App() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleAsk = async (e) => {
		e.preventDefault();
		if (!question.trim()) return;

		setLoading(true);
		setAnswer('');
		setError('');

		try {
			// Connect to backend
			const response = await fetch('http://localhost:3000/api/ask', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ question }),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.error || 'Server Error');

			setAnswer(data.answer);
		} catch (err) {
			console.error(err);
			setError('Nepavyko susisiekti su serveriu.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container'>
			<div className='card'>
				<h1>Klausimėlis</h1>
				<p>Užduok klausimą, į kurį būtų galima atsakyti Taip arba Ne.</p>

				<form onSubmit={handleAsk}>
					<input type='text' placeholder='Ar man šiandien pasiseks?' value={question} onChange={(e) => setQuestion(e.target.value)} disabled={loading} />
					<button type='submit' disabled={loading || !question}>
						{loading ? 'Sekundėlę...' : 'Klausti'}
					</button>
				</form>

				{answer && (
					<div className='result'>
						<h2>{answer}</h2>
					</div>
				)}
				{error && <p className='error'>{error}</p>}
			</div>
		</div>
	);
}

export default App;
