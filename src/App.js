import React, { useState, useEffect } from "react";
import "./styles.css";
import SplashScreen from "./Splashscreen";
import Fullview from "./Fullview";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return <div className="App">{loading ? <SplashScreen /> : <Fullview />}</div>;
}

export default App;
