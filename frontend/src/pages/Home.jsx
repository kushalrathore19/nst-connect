import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Mesh Gradient for Depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-100 blur-[100px]"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm">
            <img src="/nst-logo.png" alt="NST" className="w-5 h-5 object-contain" />
            Official Newton School of Technology Portal
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
            Your Future <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400">
              Starts Here.
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Bridging the gap between prospective students and campus reality. Get unfiltered insights from the pioneers of the NST ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              to="/connect" 
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-slate-300 hover:bg-indigo-600 transition-all hover:-translate-y-1 active:scale-95"
            >
              Consult a Senior
            </Link>
            <Link 
              to="/faqs" 
              className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              Explore FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS BAR (Trust Signals) --- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100 text-center">
          <div>
            <p className="text-3xl font-black text-slate-900">50+</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Verified Mentors</p>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">200+</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Questions Solved</p>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">100%</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Peer Verified</p>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">M4</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Ready Curriculum</p>
          </div>
        </div>
      </section>

      {/* --- FEATURES (The Workflow) --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="group relative">
             <div className="absolute -inset-2 rounded-[2.5rem] bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative p-8">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-8 group-hover:bg-indigo-600 transition-colors">
                  01
                </div>
                <h3 className="text-2xl font-black mb-4">Unfiltered Truth</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Skip the marketing. Learn about the actual workload, the Sonipat campus life, and the MacBook Pro M4 developer setup from people using it daily.
                </p>
             </div>
          </div>

          <div className="group relative">
             <div className="absolute -inset-2 rounded-[2.5rem] bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative p-8">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-8 group-hover:bg-indigo-600 transition-colors">
                  02
                </div>
                <h3 className="text-2xl font-black mb-4">Domain Experts</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Whether you are into AI/ML, Full-stack, or Competitive Programming, find a senior specialized in your target domain.
                </p>
             </div>
          </div>

          <div className="group relative">
             <div className="absolute -inset-2 rounded-[2.5rem] bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative p-8">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-8 group-hover:bg-indigo-600 transition-colors">
                  03
                </div>
                <h3 className="text-2xl font-black mb-4">Seamless Booking</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Connect via WhatsApp or schedule a direct Google Meet. We value your time as much as our mentors do.
                </p>
             </div>
          </div>

        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">
            Ready to secure your spot?
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto relative z-10">
            Don't let your doubts hold you back. The Newton School of Technology community is waiting for you.
          </p>
          <Link 
            to="/connect" 
            className="inline-block bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 relative z-10"
          >
            Get Started Now
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;