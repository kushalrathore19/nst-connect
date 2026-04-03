import { useState, useEffect } from 'react';
import { getQueries, createFaq } from '../lib/api';

function Admin() {
  const [queries, setQueries] = useState([]);
  const [faqForm, setFaqForm] = useState({ category: 'Academics', question: '', answer: '' });

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await getQueries();
      setQueries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFaq(faqForm);
      setFaqForm({ category: 'Academics', question: '', answer: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Add New FAQ</h2>
        <form onSubmit={handleFaqSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={faqForm.category}
              onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
            >
              <option value="Academics">Academics</option>
              <option value="Hostel">Hostel</option>
              <option value="Placements">Placements</option>
              <option value="Fees">Fees</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Question</label>
            <input 
              type="text" 
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={faqForm.question}
              onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Answer</label>
            <textarea 
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={faqForm.answer}
              onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Save FAQ
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Submitted Queries</h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {queries.map((query) => (
            <div key={query._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{query.senderName}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${query.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {query.status}
                </span>
              </div>
              <a href={`mailto:${query.senderEmail}`} className="text-sm text-blue-600 mb-3 inline-block">{query.senderEmail}</a>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                {query.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;