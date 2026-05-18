import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
             <img src="https://d3dyfaf3iutrxo.cloudfront.net/general/upload/f8853b74e6274770bff954565147aa8f.png" alt="NST Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            NST <span className="text-blue-600">Connect</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-all duration-300 hover:scale-105">Home</Link>
          <Link to="/faqs" className="hover:text-blue-600 transition-colors">Knowledge Base</Link>
          <Link to="/connect" className="hover:text-blue-600 transition-colors">Talk to Seniors</Link>
          <Link 
            to="/admin" 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
