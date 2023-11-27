import React from 'react'
import styled from 'styled-components'

const Message = ({message, timestamp, user, userImage}) => {
    const date = timestamp?.toDate();
  
    if (!date) {
      // Handle the case where timestamp is missing or not valid
      return null; // or you can display an error message
    }
    

  return (
    <div>
        <MessageContainer>
        <img src={userImage} alt="" />
        <MessageInfo>
            <h4>
                {user}{' '}
                <span>
                    {date.toISOString()}
                </span>
            </h4>
            <p>{message}</p>
        </MessageInfo>
        </MessageContainer>
    </div>
  )
}

export default Message

const MessageContainer = styled.div`
    display:flex;
    align-items: center;
    padding: 20px;


    > img {
        height: 50px;
        border-radius: 8px;
    }
`
const MessageInfo = styled.div`
    padding-left: 10px;


    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
        
    }
`