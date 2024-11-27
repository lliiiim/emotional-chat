// src/services/api.js

// async function fetchResponse(message) {
//     try {
//         const response = await fetch('http://localhost:8007/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ message, emotionType: selectedemotion.type }),
//         });
//         const data = await response.json();
//         displayMessage('bot', data.reply.content);
//     } catch (error) {
//         displayMessage('bot', 'An error occurred. Please try again later.');
//     }
// }

// 감정과 메시지를 서버에 전송하는 함수
export async function sendMessageToServer(emotion, message) {
  try {
    const response = await fetch(`http://localhost:8007/api/emotion-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emotion, message }),
    });

    const data = await response.json();
    return data.reply;  // 서버의 응답 메시지 반환
  } catch (error) {
    console.error('서버 통신 오류:', error);
    return '서버와 연결할 수 없습니다.';
  }
}
