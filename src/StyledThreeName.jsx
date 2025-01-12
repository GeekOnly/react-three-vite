import styled from 'styled-components';
import React from 'react';
import Intro from './intro';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  pointer-events: none;
  
  /* ทำให้เลื่อนเมื่อ scroll */
  transition: transform 0.5s ease;
  transform: translateY(${props => props.scrollPosition}px); /* เลื่อนตาม scroll */
`;

const TopLeft = styled.div`
  position: fixed;
  color: #F98404;
  opacity: 0.55;
  bottom: 12vw;
  left: 3vw;
  font-family: 'Inter';
  letter-spacing: 1em;
  font-weight: 700;
  font-size: 2em;
  line-height: 0.9em;
`;

const TopMidLeft = styled.div`
  position: fixed;
  color: #F7FD04;
  bottom: 7vw;
  left: 2vw;
  font-family: 'Poppins', sans-serif;  
  font-weight: 700;
  font-size: 6em;
  line-height: 0.9em;
`;

const BottomLeft = styled.div`
  position: fixed;
  bottom: 1vw;
  left: 2vw;
  font-family: 'Poppins', sans-serif;  
  font-weight: 900;
  font-size: 2em;
  line-height: 0.9em;
  pointer-events: none;
`;

const StyledThreeName = () => {
  return (
    <Overlay>
      <TopLeft>
        <i>Sanphet Somjit</i>
      </TopLeft>

      <TopMidLeft>
        <i>Game Developer</i>
      </TopMidLeft>

      <BottomLeft>
        <Intro />
      </BottomLeft>
    </Overlay>
  );
};

export default StyledThreeName;
