import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { doc, collection } from "firebase/firestore"; // Import Firestore references
import Message from "./Message";

const Chat = () => {
    const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  // Define Firestore references conditionally
  const roomRef = roomId ? doc(db, "room", roomId) : null;
  const messagesRef = roomId ? collection(roomRef, "messages") : null;

  const [roomDetails] = useDocument(roomRef);

  const [roomMessages, loading] = useCollection(messagesRef);
  const roomName = roomDetails?.data()?.name;

  

  

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading])
  

  return (
    <ChatContainer>
      {roomDetails && roomMessages &&(
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomName}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlined />
                Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>{roomMessages?.docs.map(doc => {
            const {message, timestamp, user, userImage} = doc.data()

            return (
                <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}

                />
            )
               
          })}
             <ChatBottom
             ref={chatRef}
             />
          </ChatMessages>

          <ChatInput
          chatRef={chatRef}
            channelName={roomName}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`

const ChatMessages = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  flex: 0.7;
  overflow-y: scroll;
  margin-top: 60px;
`;
