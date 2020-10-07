import React from "react";
import {
  BoundingBoxContainer,
  ImageAndBoxContainer,
} from "./facerecognition.styles";
const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <>
      <ImageAndBoxContainer>
        <div className="absolute mt2">
          <img
            id="inputimage"
            src={imageUrl}
            alt=""
            width="500px"
            height="auto"
          />
          {boxes
            ? boxes.map((box) => (
                <BoundingBoxContainer
                  primary
                  {...box}
                  key={boxes.indexOf(box)}
                ></BoundingBoxContainer>
              ))
            : null}
        </div>
      </ImageAndBoxContainer>
    </>
  );
};

export default FaceRecognition;
