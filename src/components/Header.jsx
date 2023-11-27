import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { AccessTime, HelpOutline, Search } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user] = useAuthState(auth)
  return (
    <HeaderContainer>
      {/* Header left */}
      <HeaderLeft>
        <HeaderAvatar 
        onClick={() => auth.signOut()}
        alt={user?.displayName}
        src={user?.photoURL}
        />
        <AccessTime />
      </HeaderLeft>
      {/* Header search */}
      <HeaderSearch>
        <Search />
        <input type="text" placeholder="Search" />
      </HeaderSearch>
      {/* Header right */}
      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

// styled components

const HeaderRight = styled.div`
    display: flex;
    flex: 0.3;
    align-items: flex-end;


    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;

    }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  justify-content: space-between;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  margin-left: 20px;
  align-items: center;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
    
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  background-color: #421f44;
  color: gray;
  padding: 0 50px;
  border: 1px gray solid;
  display: flex;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;
