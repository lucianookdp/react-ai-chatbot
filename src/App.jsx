import React, { useEffect } from "react";
import Chatbot from "./components/Chatbot";

function App() {
  useEffect(() => {
    document.body.className = "bg-background text-white";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Chatbot />
    </div>
  );
}

export default App;
