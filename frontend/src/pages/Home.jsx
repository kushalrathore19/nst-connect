import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 px-4">
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Clear Your Doubts About Newton School of Technology
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Get real answers about academics, placements, and hostel life directly from our knowledge base or by speaking 1-on-1 with current students.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/faqs" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Browse FAQs
          </Link>
          <Link to="/connect" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Talk to a Senior
          </Link>
        </div>
      </section>

      <section className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">1</div>
            <h3 className="text-xl font-bold mb-2">Search</h3>
            <p className="text-gray-600">Find instant answers to common questions in our curated Knowledge Base.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">2</div>
            <h3 className="text-xl font-bold mb-2">Pick a Student</h3>
            <p className="text-gray-600">Browse profiles of active NST seniors and find someone with your tech stack.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">3</div>
            <h3 className="text-xl font-bold mb-2">Clear Doubts</h3>
            <p className="text-gray-600">Book a 1-on-1 Calendly session and get all your specific questions answered.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;