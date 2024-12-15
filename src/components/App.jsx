import { useEffect, useState } from "react";

export default function App() {
    const [msg, setMsg] = useState(0);
  
    useEffect(() => {
      fetch('/hello_world').then(res => res.json()).then(data => {
        setMsg(data.message);
      });
    }, []);
  
    return (
      <div className="App">
        <header className="App-header">
          <p>{msg}</p>
        </header>
      </div>
    );
  }