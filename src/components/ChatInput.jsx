import { Button } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      console.error('Channel ID is null or undefined.');
      return;
    }

    // Create a reference to the specific document in the "room" collection using the channelId
    const roomDocRef = doc(db, 'room', channelId);

    // Add a new message document to the "messages" subcollection within the specific room document
    addDoc(collection(roomDocRef, 'messages'), {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    })

    setInput('');
  }

  return (
    <div>
      <ChatInputContainer>
        <form>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
          <Button hidden type='submit' onClick={sendMessage}>
            SEND
          </Button>
        </form>
      </ChatInputContainer>
    </div>
  )
}

export default ChatInput

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`

