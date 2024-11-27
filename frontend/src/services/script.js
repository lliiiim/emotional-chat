const EMOTION_TYPES = {
    // 기쁨이 슬픔이 버럭이 까칠이 소심이
    joy : {
        type : "joy",
        img : "./images/joy"
    },
    sadness : {
        type : "sadness",
        img : "./images/sadness"
    },
    anger : {
        type : "anger",
        img : "./images/anger"
    },
    disgust : {
        type : "disgust",
        img : "./images/disgust"
    },
    fear : {
        type : "fear",
        img : "./images/fear"
    },
}

let selectedEmotion = null;

function selectEmotion(emotionType){
    document.querySelectorAll(".emotion-option").forEach((option) => {
        option.classList.remove("selected");
    });

    document.querySelector(`.emotion-option[onClick="selectEmotion('${emotionType}')"]`)
    .classList.add("selected");

    selectedEmotion = EMOTION_TYPES[emotionType];
    resetChat();
}

function resetChat(){
    const chatContent = document.getElementById("chat-content");
    chatContent.innerHTML = ""; // 채팅 내용 삭제
}