import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For smooth animations
import { getStudents } from '../lib/api';
import SkeletonCard from '../components/SkeletonCard'; // Assuming you created this earlier

function Connect() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // Added search state

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      // Simulate a small delay for the "shimmer" effect to be visible (optional)
      setTimeout(() => setLoading(false), 800);
    }
  };

  const categories = ['All', 'MERN', 'AI/ML', 'UI/UX', 'Python', 'Data Science'];

  // Combined Search + Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesFilter = activeFilter === 'All' || 
      student.techStack.some(tech => tech.toLowerCase().includes(activeFilter.toLowerCase()));
    
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.techStack.join(' ').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 selection:bg-indigo-100">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 mb-4 tracking-tight"
          >
            Meet Your <span className="text-indigo-600">Mentors</span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Verified seniors ready to help you navigate the NST ecosystem.
          </p>
        </header>

        {/* --- SEARCH & FILTERS --- */}
        <div className="space-y-6 mb-16">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by name, skill, or interest..."
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-3 overflow-x-auto pb-4 justify-center no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm ${
                  activeFilter === cat 
                    ? 'bg-slate-900 text-white scale-105' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- MENTOR GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {loading ? (
              // Show 6 Skeletons while loading
              [...Array(6)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <motion.div
                  key={student._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 p-8 flex flex-col relative overflow-hidden"
                >
                  {/* Decorative Gradient Blob */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[4rem] -mr-12 -mt-12 transition-all group-hover:bg-indigo-100 group-hover:scale-110"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200 group-hover:rotate-3 transition-transform">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{student.name}</h2>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">
                          Batch 202{student.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Domains</p>
                      <div className="flex flex-wrap gap-2">
                        {student.techStack.map((tech, index) => (
                          <span key={index} className="bg-slate-50 text-slate-600 text-[11px] px-3 py-2 rounded-xl border border-slate-100 font-bold group-hover:border-indigo-200 group-hover:bg-white transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href={student.calendlyLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                      >
                        Schedule
                      </a>
                      {student.whatsappNumber && (
                        <a 
                          href={`https://wa.me/${student.whatsappNumber.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-14 flex items-center justify-center bg-[#25D366] text-white rounded-2xl hover:bg-[#128C7E] transition-all shadow-lg active:scale-95"
                          title="WhatsApp"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100"
              >
                <p className="text-slate-400 font-bold text-lg">No mentors match your current search.</p>
                <button onClick={() => {setActiveFilter('All'); setSearchTerm('');}} className="mt-4 text-indigo-600 font-black hover:underline underline-offset-8">Clear all filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Connect;