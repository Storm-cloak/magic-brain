import React from "react";
import { Nav, Text } from "./navigation.styles";
import Logo from "../logo/logo.component";
const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div className="flex justify-between">
        <Logo></Logo>
        <Nav>
          <Text onClick={() => onRouteChange("signout")}>Sign Out</Text>
        </Nav>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between">
        <Logo></Logo>
        <Nav>
          <Text onClick={() => onRouteChange("signin")}>Sign in</Text>
          <Text onClick={() => onRouteChange("register")}>Register</Text>
        </Nav>
      </div>
    );
  }
};

export default Navigation;
