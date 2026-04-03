import { useState, useEffect } from 'react';
import { 
  loginAdmin, getQueries, createFaq, getFaqs, updateQueryStatus, 
  getPendingStudents, approveStudent, 
  deleteFaq, deleteStudent, deleteQuery 
} from '../lib/api';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [queries, setQueries] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [faqs, setFaqs] = useState([]); 
  
  const [faqForm, setFaqForm] = useState({ category: 'Academics', question: '', answer: '' });

  useEffect(() => {
    // Check if the user is already logged in with a token
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [queriesRes, studentsRes, faqsRes] = await Promise.all([
        getQueries(),
        getPendingStudents(),
        getFaqs('All') 
      ]);
      setQueries(queriesRes.data);
      setPendingStudents(studentsRes.data);
      setFaqs(faqsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
      // If the token is invalid or expired, log them out
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use the new loginAdmin API call
      const response = await loginAdmin(password);
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Incorrect password or server error!");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setPassword(''); // Clear the password field
  };

  // --- CREATE & UPDATE HANDLERS ---
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createFaq(faqForm);
      setFaqs([...faqs, res.data]); 
      setFaqForm({ category: 'Academics', question: '', answer: '' });
      alert("FAQ successfully added!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      await updateQueryStatus(id, 'Resolved');
      setQueries(queries.map(q => q._id === id ? { ...q, status: 'Resolved' } : q));
    } catch (error) {
      console.error("Failed to update status", error);
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

  // --- DELETE (GOD MODE) HANDLERS ---
  const handleDeleteFaq = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteFaq(id);
        setFaqs(faqs.filter(f => f._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Remove this mentor permanently?")) {
      try {
        await deleteStudent(id);
        setPendingStudents(pendingStudents.filter(s => s._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  const handleDeleteQuery = async (id) => {
    if (window.confirm("Delete this query history?")) {
      try {
        await deleteQuery(id);
        setQueries(queries.filter(q => q._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  // --- RENDER LOGIN ---
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

  // --- RENDER DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Added a Logout Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleLogout} 
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* SECTION 1: MANAGE FAQS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-6">Manage FAQs</h2>
          <form onSubmit={handleFaqSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full p-2 border rounded-lg text-sm"
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Question</label>
                <input 
                  type="text" required value={faqForm.question}
                  onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                  className="w-full p-2 border rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Answer</label>
              <textarea 
                required rows="2" value={faqForm.answer}
                onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                className="w-full p-2 border rounded-lg text-sm"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-sm">
              Add FAQ
            </button>
          </form>

          {/* List existing FAQs to delete */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {faqs.map(faq => (
              <div key={faq._id} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">{faq.category}</span>
                  <p className="font-semibold text-slate-800">{faq.question}</p>
                </div>
                <button onClick={() => handleDeleteFaq(faq._id)} className="text-red-500 p-1 hover:bg-red-100 rounded ml-2" title="Delete FAQ">
                  🗑️
                </button>
              </div>
            ))}
          </div>
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
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApproveMentor(student._id)}
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-700"
                    >
                      Approve
                    </button>
                    {/* NEW DELETE BUTTON FOR STUDENTS */}
                    <button 
                      onClick={() => handleDeleteStudent(student._id)}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-100 border border-red-100"
                      title="Delete Permanently"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2"><strong>Tech:</strong> {student.techStack.join(', ')}</p>
                <a href={student.calendlyLink} target="_blank" className="text-xs text-blue-500 underline">View Calendly</a>
              </div>
            ))}
            {pendingStudents.length === 0 && <p className="text-gray-400 text-center py-10">No new mentor requests.</p>}
          </div>
        </div>
      </div>

      {/* SECTION 3: QUERIES */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Parent/Student Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div key={query._id} className="p-5 rounded-xl border border-gray-200 flex flex-col justify-between relative group">
              
              {/* NEW DELETE BUTTON FOR QUERIES (Shows on hover) */}
              <button 
                onClick={() => handleDeleteQuery(query._id)}
                className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-200"
                title="Delete Query"
              >
                🗑️
              </button>

              <div>
                <div className="flex justify-between mb-3 pr-4">
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