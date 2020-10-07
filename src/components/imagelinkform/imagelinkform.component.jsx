import React from "react";
import {
  InputFormContainer,
  InputAndButtonWrapperContainer,
  ButtonContainer,
} from "./imagelinkform.styles";
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <>
      <p className="f3 tc">
        {"This Magic Brain will detect faces in your pictures.Give it a try!"}
      </p>
      <InputAndButtonWrapperContainer>
        <InputFormContainer
          type="text"
          onChange={onInputChange}
        ></InputFormContainer>
        <ButtonContainer onClick={onButtonSubmit}>DETECT</ButtonContainer>
      </InputAndButtonWrapperContainer>
    </>
  );
};

export default ImageLinkForm;
