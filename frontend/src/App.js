import './App.css';
import React, { useState } from 'react';
import EmotionSelector from './components/EmotionSelector';
import MessageList from './components/MessageList';
import styled from 'styled-components';

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #808080, ${(props) => (props.color)}); 
  // position: relative;
  // background-image: url('/images/background.jpg'); /* public 폴더 내의 이미지 경로 */
  // background-size: cover; /* 배경 이미지를 화면에 맞게 확대/축소 */
  // background-position: center; /* 이미지가 화면 중앙에 위치하게 */
  // background-repeat: no-repeat; /* 이미지 반복 방지 */
  // overflow: hidden;
`;

function App() {
  const [selectedEmotionColor, setEmotionColor] = useState('black');

  const emotionColor = (color) => {
    setEmotionColor(color);
  };

  const [selectedEmotion, setSelectedEmotion] = useState('none');
    // const [selectedEmotionColor, setEmotionColor] = useState('black');

  const emotionSelect = (emotion) => {
      setSelectedEmotion(emotion);
  };

  const resetChat = (e) => ({
    
  });

  return (
    <div className='app'>
      <Background color={selectedEmotionColor}>
        <h1>Talk to your Inside</h1>
        <EmotionSelector selectedEmotion={selectedEmotion} emotionSelect={emotionSelect} emotionColor={emotionColor} resetChat={resetChat}/>
        <MessageList selectedEmotion={selectedEmotion} selectedEmotionColor={selectedEmotionColor} resetChat={resetChat}/>
      </Background>
    </div>
  );
}

export default App;
