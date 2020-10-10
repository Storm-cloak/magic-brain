import styled from "styled-components";
import Tilt from "react-tilt";
export const LogoContainer = styled.div.attrs({
  className: "ml4 mt4",
})``;

const Animation = styled(Tilt).attrs({
  className: "Tilt flex items-center br4 shadow-2 vh-20 w-30",
})``;

export const TiltContainer = styled(Animation)`
  min-width: 100px;
  background: rgb(238, 174, 202);
  background: -moz-radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#eeaeca",endColorstr="#94bbe9",GradientType=1);
`;
