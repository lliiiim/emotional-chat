import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatWindow = styled.div`
    width: 700px;
    height: 500px;
    border: 3px solid ${(props) => (props.color)};
    border-radius: 15px;
    margin: 0 auto; /* 수평 중앙 정렬 */
    position: relative;
    background: white;    
    // overflow-y: auto;  /* 세로 스크롤 활성화 */
    // padding: 10px;     /* 내용이 상단과 좌우에 너무 붙지 않도록 여백 추가 */
`
const ConversationWindow = styled.div`
    overflow-y: auto;
    padding: 10px;
    height: 80%;
    width: 98%;
    padding: 5px;
`

const UserForm =  styled.p`
    background: ${(props) => (props.color)};
    border-radius: 10px;
    padding: 5px 10px;
    width: max-content;
    max-width: 80%; /* 최대 너비 */
    margin-left: auto; /* 오른쪽 정렬 */
    margin-bottom: 5px;
    word-wrap: break-word; /* 텍스트가 길어지면 줄 바꿈 */
    font-size: 14px;
    // display: inline-block; /* 글자 크기에 맞게 너비 조정 */
`
const ReplyForm =  styled.p`
    background: #d3d3d3;
    border-radius: 10px;
    padding: 5px 10px;
    width: max-content;
    max-width: 60%; /* 최대 너비 제한 */
    margin-right: auto; /* 왼쪽 정렬 */
    margin-bottom: 5px;
    word-wrap: break-word; /* 글자가 너무 길면 줄 바꿈 */
    font-size: 14px;
    // display: inline-block; /* 글자 크기에 맞게 너비 조정 */
`
const MessageForm = styled.form`
    width: 100%;
    height: 15%;
    border-top: 3px solid ${(props) => (props.color)};
    position:absolute; 
    bottom:0px;
`
const SendButton = styled.button`
    width: 15%;
    height: 70%;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.color || '#ccc'};
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`

function MessageList({selectedEmotion, selectedEmotionColor, resetChat}){
    const[message, setMessage] = useState('');
    const[conversations, setConversations] = useState([]);

    const handleReset = () => {
        setMessage(''); // user 채팅 기록 초기화
        setConversations([]);  // 답변 기록 초기화
    };

    // resetChat 함수가 호출되면 채팅 리셋
    React.useEffect(() => {
        handleReset();
    }, [resetChat]);
    
    const goToEndMessage = useRef(null);

    useEffect(() => {
        goToEndMessage.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversations]);
    

    if (selectedEmotion === 'none') {
        return (
            <div>
                <ChatWindow color='black' style={{ textAlign: 'center' }}>
                    <h2>감정을 선택해주세요!</h2>
                    <p>선택된 감정이 없습니다. 원하는 감정을 선택하면 대화를 시작할 수 있습니다.</p>
                </ChatWindow>
            </div>
        );
    }
    
    const chatSend = async () => {
        if(!message) return;
        try {
            const response = await axios.post('http://localhost:8007/chat', {msg : message, emotion : selectedEmotion});
            // setReplies(replies => [...replies, response.data.reply.content]);
            
            const newConversation = { userMsg : message, answer : response.data.reply.content };
            setConversations (conversations => [...conversations, newConversation]);
            setMessage('');
        } catch (error) {
            console.error ('Error during the chat request:', error);
            // setReplies(replies => [...replies, 'An error occurred while receiving the response']);
            const newConversation = { userMsg : message, answer: 'An error occurred while receiving the response'};
            setConversations (conversations => [...conversations, newConversation]);
            setMessage('');
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 새로고침 방지
        setMessage(message);
        chatSend(); // 전송 함수 호출
    };

    return(
        <div>
            <ChatWindow color={selectedEmotionColor}>
                <ConversationWindow>
                    {conversations.map((msg, index) => (
                        <div key={index}>
                            <UserForm color={selectedEmotionColor}>{msg.userMsg}</UserForm>
                            <ReplyForm>{msg.answer}</ReplyForm>
                        </div>))}
                    <div ref={goToEndMessage} />
                </ConversationWindow>
                <MessageForm color={selectedEmotionColor} onSubmit={handleSubmit}>
                    <input style={{outline: 'none', margin: '1%', width:'80%', height:'80%', borderWidth: '0'}}
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <SendButton type='submit' color={selectedEmotionColor}>전송</SendButton>
                </MessageForm>
            </ChatWindow>
        </div>
    );
}

export default MessageList;