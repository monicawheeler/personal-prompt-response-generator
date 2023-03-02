import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [childInput, setchildInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: childInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setchildInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
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
          <input
            type="text"
            name="child"
            placeholder="What's your name?"
            value={childInput}
            onChange={(e) => setchildInput(e.target.value)}
          />
          <input type="submit" value="Create story" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
