import { useState, useEffect } from 'react';
import { sendGreeting } from './backend';
import { MessageCircle, RefreshCw, Plus, RotateCcw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
import { Button } from './components/ui/button';

function App() {
  // State for the greeting from Rust backend
  const [greeting, setGreeting] = useState<string | null>(null);
  // State to track if we're loading the greeting
  const [isLoading, setIsLoading] = useState(false);
  // State for the counter
  const [counter, setCounter] = useState(0);

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

  // Function to increment counter
  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  // Function to reset counter
  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Hello World</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Tauri + React Demo</CardTitle>
            <CardDescription>
              A simple Tauri app that demonstrates communication with the Rust backend.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Message from Rust:</h3>
              {isLoading ? (
                <p className="text-muted-foreground">Loading greeting from Rust...</p>
              ) : (
                <p className="rounded bg-muted p-3 font-medium">{greeting}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={fetchGreeting} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Greeting</span>
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Counter Demo</CardTitle>
            <CardDescription>
              A simple counter implementation using React state.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Count:</h3>
              <p className="rounded bg-muted p-3 font-medium text-center text-2xl">{counter}</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between gap-4">
            <Button 
              onClick={incrementCounter} 
              className="flex-1"
              variant="default"
            >
              <span className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Increment</span>
              </span>
            </Button>
            <Button 
              onClick={resetCounter} 
              className="flex-1"
              variant="outline"
            >
              <span className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </span>
            </Button>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground">
          Powered by Tauri, React, and TypeScript
        </p>
      </div>
    </div>
  );
}

export default App;
