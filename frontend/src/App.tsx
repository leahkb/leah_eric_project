import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import eric from "./assets/eric.jpeg";
import eric2 from "./assets/eric2.jpeg";
import ericsneeze from "./assets/ericsneeze.jpeg";
import ericgolf from "./assets/ericgolf.jpeg";
import "./App.css";
import TextChange from "./Components/TextChange";
import CuteButton from "./Components/CuteButton";

interface Idea {
  id: number;
  body: string;
  createdDate: string;
  author: {
    id: number;
    username: string;
  };
}

function App() {
  const {
    data: ideas,
    isLoading,
    error,
  } = useQuery<Idea[]>({
    queryKey: ["ideas"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ideas`);
      if (!res.ok) throw new Error("Failed to fetch ideas");
      return res.json();
    },
  });

  return (
    <>
      <section id="header">
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "48px",
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: "2px",
          }}
        >
          Eric x Leah
        </h1>
      </section>

      <section id="hero" style={{ padding: "35px" }}>
        <div className="hero">
          <img src={eric} className="base" width="200" height="350" alt="" />
          <img src={eric2} className="base" width="200" height="350" alt="" />
          <img
            src={ericsneeze}
            className="base"
            width="200"
            height="350"
            alt=""
          />
          <img
            src={ericgolf}
            className="base"
            width="200"
            height="350"
            alt=""
          />
        </div>
      </section>

      <section style={{ padding: "35px" }} id="text-input">
        <TextChange />
      </section>

      <section id="ideas">
        <h2>Ideas from Database</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {ideas && (
          <ul>
            {ideas.map((idea) => (
              <li key={idea.id}>
                <strong>{idea.author.username}</strong>: {idea.body}
                <br />
                <small>{new Date(idea.createdDate).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        id="buttons"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          maxWidth: "700px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <CuteButton> Games </CuteButton>
        <CuteButton> Music Recommendations </CuteButton>
        <CuteButton> Movie List </CuteButton>
        <CuteButton> Calendar </CuteButton>
      </section>
    </>
  );
}

export default App;
