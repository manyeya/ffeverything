import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

interface ConverterProps {
  file: File;
  filename: string;
}

function Converter(props: ConverterProps) {
  const { file, filename } = props;

  const [videoSrc, setVideoSrc] = useState("");
  const [message, setMessage] = useState("Click Start to transcode");

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const doTranscode = async () => {
    setMessage("Loading ffmpeg-core.js");

    await ffmpeg.load();

    setMessage("Start transcoding");
    ffmpeg.FS("writeFile", `${filename}`, await fetchFile(file));
    await ffmpeg.run("-i", `${filename}`, `${filename}-new.avi`);

    setMessage("Complete transcoding");

    const data = ffmpeg.FS("readFile", `${filename}-new.avi`);

    setVideoSrc(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
  };

  return (
    <div className="App">
      <p />
      <video src={videoSrc} controls></video>
      <br />
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default Converter;
