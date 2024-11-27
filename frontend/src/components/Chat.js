import React, { useState } from 'react';
import EmotionSelector from './EmotionSelector';

function Chat({emotionColor, resetChat}){
    const [selectedEmotion, setSelectedEmotion] = useState('');

    const emotionSelect = (emotion) => {
        setSelectedEmotion(emotion);
    };

    return(
        <div>
            <EmotionSelector selectedEmotion={selectedEmotion} emotionSelect={emotionSelect} emotionColor={emotionColor} resetChat={resetChat}/>
        </div>
    );
}

export default Chat;