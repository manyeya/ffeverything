import React from "react";
import { useDropzone } from "react-dropzone";
import Gif from "./Gif";

function TheDropZone() {
  const { acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
    });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
      </aside>
      {acceptedFiles.map((file) => (
        <Gif file={file}/>
      ))}
    </section>
  );
}

export default TheDropZone;
