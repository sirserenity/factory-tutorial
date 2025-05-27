import { useState, useEffect } from 'react';
import { sendGreeting } from './backend';
import './App.css';

function App() {
  // State for the greeting from Rust backend
  const [greeting, setGreeting] = useState<string | null>(null);
  // State to track if we're loading the greeting
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch greeting from Rust backend
  const fetchGreeting = async () => {
    setIsLoading(true);
    try {
      const response = await sendGreeting('World');
      setGreeting(response);
    } catch (error) {
      console.error('Failed to get greeting:', error);
      setGreeting('Error connecting to Rust backend');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch greeting on component mount
  useEffect(() => {
    fetchGreeting();
  }, []);

  return (
    <div className="container">
      <h1>Hello World</h1>
      
      <div className="card">
        <p>
          A simple Tauri app that demonstrates communication with the Rust backend.
        </p>
        
        {/* Rust backend integration section */}
        <div className="backend-section">
          <h3>Message from Rust:</h3>
          {isLoading ? (
            <p>Loading greeting from Rust...</p>
          ) : (
            <p className="greeting">{greeting}</p>
          )}
          <div className="actions">
            <button onClick={fetchGreeting} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh Greeting'}
            </button>
          </div>
        </div>
      </div>
      
      <p className="footer">
        Powered by Tauri, React, and TypeScript
      </p>
    </div>
  );
}

export default App;
