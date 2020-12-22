import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation.component";
import ImageLinkForm from "./components/imagelinkform/imagelinkform.component";
import Rank from "./components/Rank/rank.component";
import Particles from "react-particles-js";
import FaceRecognition from "./components/facerecognition/facerecognition.component";
import SignInForm from "./components/SignIn/Signin.component";
import RegisterForm from "./components/Register/register.component";
import { particleOptions } from "./utils/particleOptions";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

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
    fetch("http://localhost:3001/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setSignedIn(false);
      setInput("");
      setImageUrl("");
      setBoxes([]);
      setUser({ id: "", name: "", email: "", entries: 0, joined: "" });
    } else if (route === "home") {
      setSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </>
      ) : route === "register" ? (
        <RegisterForm
          loadUser={loadUser}
          onRouteChange={onRouteChange}
        ></RegisterForm>
      ) : (
        <SignInForm
          loadUser={loadUser}
          onRouteChange={onRouteChange}
        ></SignInForm>
      )}
    </div>
  );
}

export default App;
