import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { addDoc, collection } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";



const SideBarOptions = ({ Icon, title, addChannelOption, id }) => {
    const dispatch = useDispatch();


// connects the channel buttons to firebase database
const addChannel = async () => {
    const channelName = prompt('Please enter the channel name');
    if (channelName) {
      const roomRef = collection(db, 'room');
      try {
        const docRef = await addDoc(roomRef, {
          name: channelName,
        });
        const newChannelId = docRef.id; // Get the ID of the newly added channel
        console.log('Channel added with ID: ', newChannelId);
  
        // Dispatch the enterRoom action with the new channel's ID
        dispatch(enterRoom({
          roomId: newChannelId,
        }));
      } catch (error) {
        console.error('Error adding channel: ', error);
      }
    }
  };

    const selectChannel = () => {
        if(id) {
            dispatch(enterRoom({
                roomId:id,
            }))
        }
    };





  return (
    <div>
      <SideBarOptionContainer
    //   onclick to add and select channels
    onClick={addChannelOption ? addChannel : selectChannel}
      >
        {/* Add icons to the sidebar */}
        {Icon && <Icon font-size="small" style={{ padding: 10 }} />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SideBarOptionChannel>
            <span>#</span> {title}
          </SideBarOptionChannel>
        )}
      </SideBarOptionContainer>
    </div>
  );
};

export default SideBarOptions;

const SideBarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SideBarOptionChannel = styled.div`
    padding: 10px 0px;
    font-weight: 300;
    font-size: 14px;
   > span {
    padding: 15px
   } 
`;
