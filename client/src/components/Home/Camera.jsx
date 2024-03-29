import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import {drawRect} from "../../utilities/utilities";

export default function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const tensorModel = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await tf.loadGraphModel('https://convosensebucket.s3.amazonaws.com/model.json')

    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
  
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
  
      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
  
      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [videoHeight, videoWidth]);
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
  
      try {
        const obj = await net.executeAsync(expanded)
        //console.log(await obj[7].array());
  
        //boxes is
        //scores is 2
        //classes is 5

        const boxes = await obj[7].array()
        const classes = await obj[5].array()
        const scores = await obj[2].array()
        
        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.85, videoWidth, videoHeight, ctx)});
  
        tf.dispose(img)
        tf.dispose(resized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)
      } catch (error) {
        //console.error('Error executing model:', error);
      }
    }
  };
  

  useEffect(()=>{tensorModel()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

