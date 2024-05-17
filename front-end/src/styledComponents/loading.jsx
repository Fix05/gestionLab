import styled, { keyframes } from 'styled-components';

// Animations
const bounce = keyframes`
  0% {
    top: 20px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 8px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
`;

const shadowAnimation = keyframes`
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
`;

// Styled components
const TypingIndicatorContainer = styled.div`
  width: 60px;
  height: 30px;
  position: relative;
  z-index: 4;
`;

const Circle = styled.div`
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  background-color: #000;
  left: ${props => props.left};
  animation: ${bounce} 0.5s alternate infinite ease;
  animation-delay: ${props => props.delay};
`;

const Shadow = styled.div`
  width: 5px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 30px;
  left: ${props => props.left};
  filter: blur(1px);
  z-index: 3;
  animation: ${shadowAnimation} 0.5s alternate infinite ease;
  animation-delay: ${props => props.delay};
`;

// React component
const Loading = () => {
  return (
    <TypingIndicatorContainer>
      <Circle left="10%" delay="0s" />
      <Circle left="50%" delay="0.2s" />
      <Circle left="90%" delay="0.3s" />
      <Shadow left="10%" delay="0s" />
      <Shadow left="50%" delay="0.2s" />
      <Shadow left="90%" delay="0.3s" />
    </TypingIndicatorContainer>
  );
};

export default Loading;
