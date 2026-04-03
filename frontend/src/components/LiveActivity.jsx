export default function LiveActivity() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-bounce-slow">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[280px]">
        {/* Pulsing Green Indicator */}
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
        
        <div>
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-0.5">Live Activity</p>
          <p className="text-[11px] text-slate-500 font-bold leading-tight">
            12 Queries resolved this week by NST Mentors
          </p>
        </div>
      </div>
    </div>
  );
}