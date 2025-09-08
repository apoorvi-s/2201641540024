import { useState } from "react";
import { Log } from "../../logging-middleware/index.js";
import "./index.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const shortenUrl = () => {
    if (!url.startsWith("http")) {
      Log("frontend", "error", "component", "Invalid URL entered by user");
      alert("Invalid URL");
      return;
    }

    const shortUrl = "short.ly/" + Math.random().toString(36).slice(2, 7);
    setShortenedUrls([...shortenedUrls, { original: url, short: shortUrl }]);
    Log("frontend", "info", "component", `URL shortened successfully: ${url}`);
    setUrl("");
  };

  return (
    <div className="container">
  <h1>URL Shortener</h1>
  <div className="input-group">
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter URL"
    />
    <button onClick={shortenUrl}>Shorten</button>
  </div>
  <ul>
    {shortenedUrls.map((item, i) => (
      <li key={i}>
        {item.original} → <a href={item.original}>{item.short}</a>
      </li>
    ))}
  </ul>
</div>
  );
}

export default App;
