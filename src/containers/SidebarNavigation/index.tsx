import * as React from "react";
import { Sports, FormatListNumbered, EmojiEventsOutlined, HelpOutline, Person, SecurityOutlined, ScoreboardOutlined } from "@mui/icons-material";
import Dictionary from "components/Dictionary";
import { NavLink } from "react-router-dom";
import { Box, styled, Typography } from "@mui/material";
import { useAuth } from "context/AuthContext";

export interface ISidebarNavigationProps {
  className?: string;
}

export default (props: ISidebarNavigationProps) =>  {
  const { user } = useAuth();
  return (
    <StyledContainer>
      <Typography
        component="h1"
        variant="h4"
        borderRadius={2}
        sx={{
          fontFamily: "Nunito",
          fontWeight: 800,
        }}
      >
        <Dictionary label="footybitz" />
      </Typography>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            <ScoreboardOutlined/><Dictionary label="matchdays"/>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/results">
            <FormatListNumbered/><Dictionary label="results"/>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/standings">
            <EmojiEventsOutlined/><Dictionary label="standings"/>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/how-to-play">
            <HelpOutline/><Dictionary label="howToPlay"/>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/profile">
            <Person/><Dictionary label="profile"/>
          </NavLink>
        </li>
        {user.firestoreData?.role === "admin" ?
        <>
          <li>
            <NavLink activeClassName="active" to="/teams">
              <SecurityOutlined/><Dictionary label="teams"/>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/competitions">
              <EmojiEventsOutlined/><Dictionary label="competitions"/>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/admin-matchdays">
              <Sports/><Dictionary label="matchdays"/>
            </NavLink>
          </li>
        </>
        : null}
      </ul>
    </StyledContainer>
  );
}


const StyledContainer = styled(Box)`
  overflow: hidden;
  position: relative;
  z-index: 1;
  & h1 {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  & img {
    height: 30px;
    display: block;
  }
  & ul {
    display: block;
    padding: 0;
    margin: 0;
    & > li {
      display: block;
      margin-bottom: 10px;
      & > a {
        padding: 16px;
        font-size: 18px;
        color: #f4f6ff;
        font-weight: 400;
        border-radius: 28px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        & > svg {
          margin-right: 16px;
        }
        &.active {
          font-weight: 700;
        }
        &:hover {
          background: ${props => props.theme.palette.primary.main};
        }
      }
    }
  }
`;