import { useState, useEffect } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/words.json')
      .then(res => res.json())
      .then(data => setWords(data))
      .catch(err => console.error(err));
  }, []);

  const filteredWords = words.filter(word =>
    word.soz.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.manasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white p-4 shadow">
        <h1 className="text-3xl font-bold text-center">Qaraqalpaq tili túsindirme sózligi</h1>
      </header>

      <main className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <input
            type="text"
            placeholder="So‘z yoki ma’nosini kiriń..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid gap-4">
          {filteredWords.length === 0 && <p className="text-center text-gray-500">Hesh qanday sóz tabılmadı.</p>}
          {filteredWords.map(word => (
            <div key={word.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-green-800">{word.soz}</h2>
              <p className="text-gray-700 mt-2">{word.manasi}</p>
              {word.mysal && <p className="text-gray-500 italic mt-2 border-t pt-2">Mısal: {word.mysal}</p>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;