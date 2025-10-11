import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 text-center text-xl">
      <h1 className="font-bold">Backend says:</h1>
      <p className="text-[blue]">{message}</p>
    </div>
  );
}

export default App;
