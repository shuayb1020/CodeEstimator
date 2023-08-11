import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the results from the server or any other data source
    // Update the "results" state with the fetched results
    const fetchResults = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/project/projects/'
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleBack = () => {
    navigate('/index'); // Navigate back to the main page
  };

  return (
    <div className="container">
      <h1>Comparison Results</h1>
      <button onClick={handleBack}>Go Back</button>
      {results.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Best</th>
              {/* Add more table headers for additional result properties */}
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.title}</td>
                <td>{result.desc}</td>
                <td>{result.winner}</td>
                {/* Render additional result properties as table cells */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Result;
