import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const ENDPOINT = {
  PROCESS_URL: "http://localhost:3001",
};

const SystemService = {
  sendUrlRequest: (url) => {
    return axios({
      method: "post",
      url: ENDPOINT.PROCESS_URL,
      data: { url },
    });
  },
};

const YoutubeEmbed = ({ embedId, resetData }) => (
  <>
    <iframe
      width="420"
      height="345"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <br />
    <button
      style={{
        background: "red",
        color: "white",
        width: "150px",
        height: "25px",
        marginTop: "10px",
        border: "white",
        borderRadius: "5px",
      }}
      onClick={resetData}
    >
      RESET
    </button>
  </>
);

const App = () => {
  const [url, setUrl] = useState("");
  const [embedId, setEmbedId] = useState("");

  const handleSubmit = () => {
    if (url) {
      let a = url.split("?v=");
      setEmbedId(a[1]);
      SystemService.sendUrlRequest(url)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const resetData = () => {
    setUrl("");
    setEmbedId("");
  };

  return (
    <div className="App">
      <h2>YOUTUBE TARGET URL</h2>
      <input value={url} onChange={({ target: { value } }) => setUrl(value)} />
      <button
        onClick={handleSubmit}
        style={{ background: "#29f", color: "white", borderColor: "#29f" }}
      >
        Submit
      </button>

      {embedId && (
        <>
          <h2>
            PREVIEW : <a href={url}> {url}</a>
          </h2>
          <YoutubeEmbed resetData={resetData} embedId={embedId} />
        </>
      )}
    </div>
  );
};

export default App;
