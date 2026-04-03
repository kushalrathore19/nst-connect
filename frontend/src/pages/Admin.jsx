import { useState, useEffect } from 'react';
import { getQueries, createFaq, updateQueryStatus, getPendingStudents, approveStudent } from '../lib/api';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [queries, setQueries] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [faqForm, setFaqForm] = useState({ category: 'Academics', question: '', answer: '' });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [queriesRes, studentsRes] = await Promise.all([
        getQueries(),
        getPendingStudents()
      ]);
      setQueries(queriesRes.data);
      setPendingStudents(studentsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  const handleApproveMentor = async (id) => {
    try {
      await approveStudent(id);
      setPendingStudents(pendingStudents.filter(s => s._id !== id));
      alert("Mentor approved and live!");
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  // ... (keep your existing handleFaqSubmit and handleStatusUpdate functions) ...

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-md text-center">
          <h2 className="mb-6 text-2xl font-bold">Admin Login</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg outline-none focus:border-blue-500"
            placeholder="Enter Admin Password"
          />
          <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* SECTION 1: ADD FAQ */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-6">Add New FAQ</h2>
          <form onSubmit={handleFaqSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                className="w-full p-3 border rounded-xl"
                value={faqForm.category}
                onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
              >
                <option value="Academics">Academics</option>
                <option value="Hostel">Hostel</option>
                <option value="Placements">Placements</option>
                <option value="Fees">Fees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Question</label>
              <input 
                type="text" required value={faqForm.question}
                onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Answer</label>
              <textarea 
                required rows="3" value={faqForm.answer}
                onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                className="w-full p-3 border rounded-xl"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
              Save FAQ
            </button>
          </form>
        </div>

        {/* SECTION 2: PENDING MENTORS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Pending Mentors <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{pendingStudents.length}</span>
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {pendingStudents.map((student) => (
              <div key={student._id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Year {student.year}</p>
                  </div>
                  <button 
                    onClick={() => handleApproveMentor(student._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
                <p className="text-sm text-slate-600 mb-2"><strong>Tech:</strong> {student.techStack.join(', ')}</p>
                <a href={student.calendlyLink} target="_blank" className="text-xs text-blue-500 underline">View Calendly</a>
              </div>
            ))}
            {pendingStudents.length === 0 && <p className="text-gray-400 text-center py-10">No new mentor requests.</p>}
          </div>
        </div>
      </div>

      {/* SECTION 3: QUERIES (Full Width) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Parent/Student Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div key={query._id} className="p-5 rounded-xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="font-bold">{query.senderName}</span>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${query.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {query.status || 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg italic">"{query.message}"</p>
              </div>
              <div className="flex gap-2">
                <a href={`mailto:${query.senderEmail}`} className="flex-1 text-center text-xs bg-slate-100 py-2 rounded-lg font-bold">Email</a>
                {query.status !== 'Resolved' && (
                  <button onClick={() => handleStatusUpdate(query._id)} className="flex-1 text-xs bg-green-50 text-green-600 py-2 rounded-lg font-bold border border-green-100">
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;