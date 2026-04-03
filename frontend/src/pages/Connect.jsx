import { useState, useEffect } from 'react';
import { getStudents } from '../lib/api';

function Connect() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Talk to a Senior</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Select a student whose background matches your interests and book a 1-on-1 session to clear all your doubts regarding NST.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student) => (
          <div key={student._id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Year {student.year} Student</p>
            </div>
            
            <div className="mb-6 flex-grow">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tech Stack:</h3>
              <div className="flex flex-wrap gap-2">
                {student.techStack.map((tech, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a 
              href={student.calendlyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book a Call
            </a>
          </div>
        ))}
      </div>
      {students.length === 0 && (
        <p className="text-center text-gray-500 py-8">No active students available at the moment.</p>
      )}
    </div>
  );
}

export default Connect;