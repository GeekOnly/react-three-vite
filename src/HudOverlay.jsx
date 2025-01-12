import styled from 'styled-components';

const HudOverlay = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  color: white;
  font-family: 'Arial', sans-serif;
  z-index: 10;
  pointer-events: none; /* Prevent interaction */
`;

const Hud = () => {
  return (
    <HudOverlay>
      <p>Health: 100</p>
      <p>Score: 2000</p>
    </HudOverlay>
  );
};

export default Hud;
