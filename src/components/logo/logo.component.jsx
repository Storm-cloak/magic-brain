import React from "react";
import brainlogo from "./logo.png";
import { LogoContainer, TiltContainer } from "./logo.styles";
const Logo = () => {
  return (
    <>
      <LogoContainer>
        <TiltContainer options={{ max: 60 }}>
          <div className="Tilt-inner pa3">
            <img src={brainlogo} alt="logo" />
          </div>
        </TiltContainer>
      </LogoContainer>
    </>
  );
};
export default Logo;
