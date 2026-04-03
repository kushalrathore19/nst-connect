import { useState, useEffect } from 'react';
import { getFaqs, createQuery } from '../lib/api';

function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openId, setOpenId] = useState(null);
  
  // New state for the contact form
  const [queryForm, setQueryForm] = useState({ senderName: '', senderEmail: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = ['All', 'Academics', 'Hostel', 'Placements', 'Fees'];

  useEffect(() => {
    fetchFaqs();
  }, [selectedCategory]);

  const fetchFaqs = async () => {
    try {
      const response = await getFaqs(selectedCategory);
      setFaqs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      await createQuery(queryForm);
      setSubmitStatus('success');
      setQueryForm({ senderName: '', senderEmail: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Knowledge Base</h1>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search questions..." 
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 mb-16">
        {filteredFaqs.map((faq) => (
          <div key={faq._id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <button 
              className="w-full text-left p-4 font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
              onClick={() => toggleAccordion(faq._id)}
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openId === faq._id ? '-' : '+'}</span>
            </button>
            {openId === faq._id && (
              <div className="p-4 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500 py-8">No FAQs found matching your criteria.</p>
        )}
      </div>

      {/* Still Have Doubts Form */}
      <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Still have doubts?</h2>
        <p className="text-gray-600 mb-6">Drop your question below and an NST student will get back to you.</p>
        
        <form onSubmit={handleQuerySubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={queryForm.senderName}
              onChange={(e) => setQueryForm({...queryForm, senderName: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={queryForm.senderEmail}
              onChange={(e) => setQueryForm({...queryForm, senderEmail: e.target.value})}
            />
          </div>
          <textarea 
            placeholder="What would you like to know?" 
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={queryForm.message}
            onChange={(e) => setQueryForm({...queryForm, message: e.target.value})}
          ></textarea>
          
          <button 
            type="submit" 
            disabled={submitStatus === 'submitting'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto"
          >
            {submitStatus === 'submitting' ? 'Sending...' : 'Submit Question'}
          </button>
          
          {submitStatus === 'success' && (
            <p className="text-green-600 font-medium mt-2">Your question has been sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 font-medium mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Faqs;