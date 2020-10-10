import styled from "styled-components";

const InputAndButtonWrapper = styled.div.attrs({
  className: "flex justify-center center pa4 br3 shadow-5",
})``;

export const ButtonContainer = styled.button.attrs({
  className: "grow w-15 h2 f4 link mh2 br2 dib white bg-light-purple",
})``;

export const InputFormContainer = styled.input.attrs({
  className: "h2 w-80 br2 shadow-5",
})``;

export const InputAndButtonWrapperContainer = styled(InputAndButtonWrapper)`
  background: radial-gradient(
        circle farthest-side at 0% 50%,
        #fb1 23.5%,
        rgba(240, 166, 17, 0) 0
      )
      21px 30px,
    radial-gradient(
        circle farthest-side at 0% 50%,
        #b71 24%,
        rgba(240, 166, 17, 0) 0
      )
      19px 30px,
    linear-gradient(
        #fb1 14%,
        rgba(240, 166, 17, 0) 0,
        rgba(240, 166, 17, 0) 85%,
        #fb1 0
      )
      0 0,
    linear-gradient(
        150deg,
        #fb1 24%,
        #b71 0,
        #b71 26%,
        rgba(240, 166, 17, 0) 0,
        rgba(240, 166, 17, 0) 74%,
        #b71 0,
        #b71 76%,
        #fb1 0
      )
      0 0,
    linear-gradient(
        30deg,
        #fb1 24%,
        #b71 0,
        #b71 26%,
        rgba(240, 166, 17, 0) 0,
        rgba(240, 166, 17, 0) 74%,
        #b71 0,
        #b71 76%,
        #fb1 0
      )
      0 0,
    linear-gradient(90deg, #b71 2%, #fb1 0, #fb1 98%, #b71 0%) 0 0 #fb1;
  background-size: 40px 60px;
  max-width: 700px;
`;
