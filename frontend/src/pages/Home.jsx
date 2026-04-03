import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic'; 
import LiveActivity from '../components/LiveActivity';

function Home() {
  const nstLogo = "https://d3dyfaf3iutrxo.cloudfront.net/general/upload/f8853b74e6274770bff954565147aa8f.png";
  const nsatLink = "https://www.newtonschool.co/newton-school-of-technology-nst/apply-referral/?utm_source=referral&utm_medium=kushalrathore19&utm_campaign=btech-computer-science-nst-students-referral-invite-your-junior--portal-referral";

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <LiveActivity />

      <section className="max-w-7xl mx-auto pt-32 pb-20 px-8 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 mb-10"
            >
              <img src={nstLogo} alt="NST" className="h-8 w-auto mix-blend-multiply" />
              <div className="h-8 w-[1px] bg-slate-300"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Gateway</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12"
            >
              Get the Inside Track on<br />
              <span className="text-indigo-600">Newton School</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-600 max-w-xl mb-12 leading-relaxed font-medium"
            >
              Get direct guidance on the NSAT and our AI-first curriculum from the seniors who are already living it.</motion.p>

            <div className="flex flex-wrap gap-4">
              <Magnetic>
                <Link to="/connect" className="px-8 py-4 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-indigo-600 transition-all flex items-center gap-3">
                  Talk to a Senior →
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={nsatLink} className="px-8 py-4 bg-white border border-slate-200 rounded-lg font-bold text-sm hover:border-slate-400 transition-all">
                  Apply for NSAT
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hidden lg:block w-96 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm rotate-1">
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Primary Hub</p>
                <p className="text-sm font-black">Newton School of Technology</p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Community Validated</p>
                <p className="text-sm font-black">100% Peer-Verified Data</p>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Expert Network</p>
                <p className="text-sm font-black">Direct Access to MERN, AI/ML & System Design Leads</p>
              </div>
              <div className="pt-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <div key={i} className="h-1.5 w-full bg-indigo-600 rounded-full"></div>)}
                </div>
                <p className="text-[9px] font-bold text-indigo-600 mt-2 uppercase">100% Peer Verified Data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-8 bg-white border border-slate-200 p-10 rounded-3xl group">
            <h3 className="text-3xl font-black mb-6 tracking-tight">Technical Curriculum Insights</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-lg leading-relaxed">
              Navigate the AI-centric syllabus. Get the ground truth on advanced Computer Science modules and the professional workflow expected at NST.
            </p>
            <Link to="/faqs" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-4 transition-all">
              Access Knowledge Base <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="md:col-span-4 bg-slate-900 text-white p-10 rounded-3xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[60px]"></div>
            <h3 className="text-2xl font-black leading-tight">Batch <br />Intelligence</h3>
            <p className="text-slate-400 text-sm font-medium mt-4">Direct links to students specialized in competitive programming & full-stack development.</p>
          </div>

          <div className="md:col-span-4 bg-indigo-50 border border-indigo-100 p-10 rounded-3xl">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 tracking-tight">Admission Vault</h3>
            <p className="text-indigo-700/70 text-sm font-medium leading-relaxed">Archives of interview experiences and technical evaluation strategies from the latest intake.</p>
          </div>

          <div className="md:col-span-8 bg-white border border-slate-200 p-10 rounded-3xl flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-black mb-4 tracking-tight">1:1 Strategy Sessions</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Book deep-dive calls via Calendly to assess institutional fit and placement objectives.</p>
            </div>
            <Link to="/connect" className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap">Schedule Call</Link>
          </div>

        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-8 pb-24">
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">Ready to apply?</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">NST Admissions 2026</p>
          </div>
          <Magnetic>
            <a href={nsatLink} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all">
              Initiate Application
            </a>
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}

export default Home;