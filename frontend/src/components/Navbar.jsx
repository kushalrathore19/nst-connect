import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">NST Connect</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/faqs" className="hover:text-blue-300">Knowledge Base</Link>
          <Link to="/connect" className="hover:text-blue-300">Talk to Seniors</Link>
          <Link to="/admin" className="hover:text-blue-300">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;