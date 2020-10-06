import React from "react";
import { Nav, Text } from "./navigation.styles";
import Logo from "../logo/logo.component";
const Navigation = () => {
  return (
    <>
      <Nav>
        <Logo></Logo>
        <Text>Sign Out</Text>
      </Nav>
    </>
  );
};

export default Navigation;
