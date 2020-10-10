import styled from "styled-components";

export const BoundingBoxContainer = styled.div`
  position: absolute;
  box-shadow: 0 0 0 3px #149df2 inset;
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  top: ${(props) => props.topRow}px;
  right: ${(props) => props.rightCol}px;
  bottom: ${(props) => props.bottomRow}px;
  left: ${(props) => props.leftCol}px;
`;

export const ImageAndBoxContainer = styled.div`
  display: flex;
  justify-content: center;
`;
