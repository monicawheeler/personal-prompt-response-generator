import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setpromptInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true); // Set loading before sending API request
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptInput }),
      });

      const data = await response.json();
      setLoading(false); // Stop loading
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setpromptInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      setLoading(false); // Stop loading in case of error
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Prompt Answererer</title>
        <link rel="icon" href="/magnify.png" />
      </Head>

      <main className={styles.main}>
        <h3>Send in your question!</h3>
        <form onSubmit={onSubmit}>
          <label for="prompt">Enter your prompt</label>
          <textarea
            rows="5"
            cols="33"
            name="prompt"
            placeholder="e.g., What is the best way to write a unit test in JavaScript"
            value={promptInput}
            onChange={(e) => setpromptInput(e.target.value)}
          />
          <input type="submit" value="Get your answer" />
        </form>
        <div className={styles.result}>
          {loading ? <span>
            <svg className={styles.loader} width="140" height="140" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <line x1="59.9833" y1="140.333" x2="219.978" y2="139" stroke="#000" stroke-width="4"/>
                <circle cx="60" cy="140" r="5" fill="#000"/>
                <circle cx="220" cy="139" r="5" fill="#000"/>
              </g>
              <path className={styles.loaderCircle} d="M109.957 122.655L140 105.309L170.043 122.655V157.345L140 174.691L109.957 157.345V122.655Z" stroke="#000" stroke-width="4"/>
              <circle className={styles.loaderCircle} cx="140" cy="140" r="13" stroke="#f5d77b" stroke-width="4"/>
              <circle className={styles.loaderCircle} cx="110" cy="192" r="13" stroke="#f7a78f" stroke-width="4"/>
              <circle className={`${styles.loaderCircle} ${styles.loaderCircle_s}`} cx="85" cy="232" r="8" stroke="#82c7c5" stroke-width="4"/>
              <circle className={styles.loaderCircle} cx="170" cy="88" r="13" stroke="#82c7c5" stroke-width="4"/>
              <circle className={`${styles.loaderCircle} ${styles.loaderCircle_s}`} cx="110" cy="192" r="5" fill="#f7a78f"/>
              <circle className={`${styles.loaderCircle} ${styles.loaderCircle_s}`} cx="185" cy="61" r="5" fill="#f5d77b"/>
            </svg>
            </span> : <>{result}</>}
        </div>
      </main>
    </div>
  );
}
