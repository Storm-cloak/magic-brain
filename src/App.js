import React from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation.component";
import ImageLinkForm from "./components/imagelinkform/imagelinkform.component";
import Rank from "./components/Rank/rank.component";
import Particles from "react-particles-js";
import { particleOptions } from "./utils/particleOptions";
function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition />  */}
    </div>
  );
}

export default App;
