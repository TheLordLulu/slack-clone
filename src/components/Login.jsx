import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const Login = () => {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    const signIn = (e) => {
      e.preventDefault();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log('Signed in user:', result.user);
        })
        .catch((error) => {
          console.error('Error signing in:', error);
        });
    };
      

  return (
    <div>
        <LoginContainer>
            <LoginInnerContainer>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="slack" />
                <h1>Sign in to the LuluSlack</h1>
                <p>lulu.slack.com</p>

                <Button onClick={signIn}>Sign in with Google </Button>
            </LoginInnerContainer>
        </LoginContainer>
    </div>
  )
}

export default Login

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;


    

`
const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);



    > img {
        object-fit: center;
        height: 100px;
        margin-bottom: 40px;
    }

    > button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48  !important;
        color: white;
    }
`