import React, {useState} from 'react';
import styled from 'styled-components';

const EMOTION_TYPES = {
    joy : {
        type : 'joy',
        img : '/images/joy.jpg',
        color : '#FFC107'
    },
    sadness : {
        type : 'sadness',
        img : '/images/sadness.jpg',
        color : '#0074D9'
    },
    anger : {
        type : 'anger',
        img : '/images/anger.jpg',
        color : '#ff0000'
    },
    disgust : {
        type : 'disgust',
        img : '/images/disgust.jpg',
        color : '#00c23f'
    },
    fear : {
        type : 'fear',
        img : '/images/fear.jpg',
        color : '#B10DC9'
    }
};

const EmotionContainer = styled.div`
    margin: 50px;
    display: flex; /* Flexbox 사용 */
    gap: 40px; /* 요소 간의 간격 */
    justify-content: center; /* 가운데 정렬 */
`
const ImageContainer = styled.div`
    width: 100px;
    margin: 0px auto;
    display: inline-block;
`

const ImageContainerStyle = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.2s linear; /* 부드럽게 커지게 */
    border: 3px solid ${(props) => (props.color)};
    filter: ${(props) => (props.selected ? 'grayscale(0%)' : 'grayscale(75%)')};
    transform: ${(props) => (props.selected ? 'scale(1.2)' : 'scale(1)')}; /* 확대 */

    &:hover {
        filter: grayscale(0%);
        transform: scale(1.2);
    }
`

function EmotionSelector({ emotionSelect, emotionColor, resetChat }) {
    const [clickedEmotion, setClickedEmotion] = useState(null);

    const handleClick = (type, color) => {
        setClickedEmotion(type);
        emotionSelect(type);
        emotionColor(color);
        resetChat();
    };

    return (
        <EmotionContainer>
            {Object.entries(EMOTION_TYPES).map(([key, { type, img, color }]) => (
                <div key={type} onClick={() => handleClick(type, color)} style={{cursor: 'pointer'}}>
                    <ImageContainer>
                        <ImageContainerStyle src={img} alt={type} selected={clickedEmotion === type} color={color}/>
                    </ImageContainer>
                </div>
            ))}
        </EmotionContainer>
    );
}  

export default EmotionSelector;