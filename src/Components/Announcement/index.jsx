import React from "react";
import { Fade, Zoom } from "react-reveal";
import styled from "styled-components";

function Announcement() {
  return (
    <Container>
      <Zoom top>
        <Title>SIX GROUP</Title>
      </Zoom>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
  font-size: 150px;
  font-size: calc(1em + 30vmin);
  font-weight: 900;

  --x-offset: -0.0625em;
  --y-offset: 0.0625em;
  --stroke: 0.025em;
  --background-color: white;
  --stroke-color: lightblue;

  text-shadow: var(--x-offset) var(--y-offset) 0px var(--background-color),
    calc(var(--x-offset) - var(--stroke)) calc(var(--y-offset) + var(--stroke))
      0px var(--stroke-color);
`;

export default Announcement;
