import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const ENDPOINT = {
  PROCESS_URL: "http://localhost:3001",
};

const SystemService = {
  sendUrlRequest: (data) => {
    return axios({
      method: "post",
      url: ENDPOINT.PROCESS_URL,
      data,
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
  const [searchTxt, setSearchTxt] = useState("");
  const [embedId, setEmbedId] = useState("");

  const handleSubmit = () => {
    if (url) {
      let videoId = url.split("?v=")[1];
      setEmbedId(videoId);
      let reqData = {
        video_url: url,
        search_txt: searchTxt,
        video_id: videoId,
      };
      SystemService.sendUrlRequest(reqData)
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
      <h2>Search text in youtube to find video</h2>
      <input
        value={searchTxt}
        style={{ height: "20px", width: "230px" }}
        placeholder="Search text in youtube to find video"
        onChange={({ target: { value } }) => setSearchTxt(value)}
      />

      <h2>Youtube video link</h2>
      <input
        value={url}
        style={{ height: "20px" }}
        onChange={({ target: { value } }) => setUrl(value)}
      />

      <button
        onClick={handleSubmit}
        style={{
          background: "#29f",
          color: "white",
          borderColor: "#29f",
          height: "26px",
        }}
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
