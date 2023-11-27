import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import SideBarOptions from "./SideBarOptions";
import { auth, db } from "../firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const SideBar = () => {
  const roomRef = collection(db, "room");
  const [channels] = useCollection(roomRef);
  const [user] = useAuthState(auth);

  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>LuluSlack</h2>
          <h3>
            <FiberManualRecord />
            {user.displayName}
          </h3>
        </SideBarInfo>
        <Create />
      </SideBarHeader>
      <SideBarOptions Icon={InsertComment} title="Threads" />
      <SideBarOptions Icon={Inbox} title="Mentions & reactions" />
      <SideBarOptions Icon={Drafts} title="Saved Items" />
      <SideBarOptions Icon={BookmarkBorder} title="Channel browser" />
      <SideBarOptions Icon={PeopleAlt} title="People & user groups" />
      <SideBarOptions Icon={Apps} title="Apps" />
      <SideBarOptions Icon={FileCopy} title="File browser" />
      <SideBarOptions Icon={ExpandLess} title="Show less" />
      <hr />

      <SideBarOptions Icon={ExpandMore} title="Channels" />
      <hr />

      <SideBarOptions Icon={Add} addChannelOption title="Add Channel" />

      {channels?.docs.map((doc) => (
        <SideBarOptions
          key={doc.id}
          id={doc.id}
          title={doc.data().name}
        />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding-bottom: 10px;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SideBarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    color: green;
  }
`;
