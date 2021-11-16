import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Logo> Lumen Luxury </Logo>{" "}
      </Wrapper>{" "}
    </Container>
  );
};

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: white;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 60px;
  background: black;
`;
