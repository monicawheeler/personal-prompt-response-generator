import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [childInput, setchildInput] = useState("");
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
        body: JSON.stringify({ child: childInput }),
      });

      const data = await response.json();
      setLoading(false); // Stop loading
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setchildInput("");
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
        <title>Story Builder</title>
        <link rel="icon" href="/book.png" />
      </Head>

      <main className={styles.main}>
        <img src="/book.png" className={styles.icon} />
        <h3>Let's make a story!</h3>
        <form onSubmit={onSubmit}>
          <label for="child">Enter your name or names (comma separated)</label>
          <input
            type="text"
            name="child"
            placeholder="e.g., boy named Grayson, dog named Basil"
            value={childInput}
            onChange={(e) => setchildInput(e.target.value)}
          />
          <input type="submit" value="Create story" />
        </form>
        <div className={styles.result}>
          {loading ? <span><img src="/waiting-rabbit.gif" className={styles.loading} /></span> : <>{result}</>}
        </div>
      </main>
    </div>
  );
}
