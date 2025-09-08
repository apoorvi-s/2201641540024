import { useState } from "react";
import { Log } from "../../logging-middleware/index.js";

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const shortenUrl = () => {
    if (!url.startsWith("http")) {
      Log("frontend", "error", "component", "Invalid URL entered by user");
      alert("Invalid URL");
      return;
    }

    const shortUrl = "short.ly/" + Math.random().toString(36).substring(2, 7);
    setShortenedUrls([...shortenedUrls, { original: url, short: shortUrl }]);

    Log("frontend", "info", "component", `URL shortened successfully: ${url}`);
    setUrl("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>URL Shortener</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={shortenUrl}>Shorten</button>

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
