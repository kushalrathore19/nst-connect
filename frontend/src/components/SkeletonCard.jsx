export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-pulse">
      {/* Header Shimmer */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
        <div className="space-y-3">
          <div className="h-5 w-32 bg-slate-200 rounded-full"></div>
          <div className="h-3 w-20 bg-slate-100 rounded-full"></div>
        </div>
      </div>
      
      {/* Content Shimmer */}
      <div className="space-y-3 mb-10">
        <div className="h-2 w-24 bg-slate-100 rounded-full mb-4"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-8 w-16 bg-slate-50 border border-slate-100 rounded-xl"></div>
          <div className="h-8 w-20 bg-slate-50 border border-slate-100 rounded-xl"></div>
          <div className="h-8 w-14 bg-slate-50 border border-slate-100 rounded-xl"></div>
        </div>
      </div>
      
      {/* Buttons Shimmer */}
      <div className="flex gap-3">
        <div className="h-14 flex-1 bg-slate-200 rounded-2xl"></div>
        <div className="h-14 w-14 bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  );
}