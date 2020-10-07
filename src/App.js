import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation.component";
import ImageLinkForm from "./components/imagelinkform/imagelinkform.component";
import Rank from "./components/Rank/rank.component";
import Particles from "react-particles-js";
import FaceRecognition from "./components/facerecognition/facerecognition.component";
import { particleOptions } from "./utils/particleOptions";

import Clarifai from "clarifai";

export const app = new Clarifai.App({
  apiKey: "efb6075a363c4122a5b836470ef61a3f",
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = clarifaiFace
      .map((el) => el.region_info.bounding_box)
      .map((elem) => {
        return {
          leftCol: elem.left_col * width,
          topRow: elem.top_row * height,
          rightCol: width - elem.right_col * width,
          bottomRow: height - elem.bottom_row * height,
        };
      });
    return boxes;
  };

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
  };
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = (event) => {
    event.preventDefault();
    setImageUrl(input);
    app.models.predict("e15d0f873e66047e579f90cf82c9882z", [input]).then(
      function (response) {
        displayFaceBox(calculateFaceLocation(response));
      },
      function (err) {
        console.log(err);
      }
    );
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
