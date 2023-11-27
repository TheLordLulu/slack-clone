import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import Chat from "./components/Chat";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";




function App() {
  let Spinner = require('react-spinkit');
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="slack" />
        <Spinner
        name="ball-spin-fade-loader"
        color="purple"
        fadeIn="none"
        />
        </AppLoadingContents>
      </AppLoading>
    )
  }




  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <Header />

          <AppBody>
            <SideBar />
            <Routes><Route path="/" exact element={<Chat/>} />
            </Routes>
          </AppBody>
        </>
        )}
       
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height:100vh;


`

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`
  
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`