import * as React from "react";
import styled from "styles/styled-components";
import Box from "components/Box";
import { Sports, FormatListNumbered, EmojiEventsOutlined, HelpOutline } from "@material-ui/icons";
import Dictionary from "components/Dictionary";
import { NavLink } from "react-router-dom";

export interface ISidebarNavigationProps {
  className?: string;
}

export default (props: ISidebarNavigationProps) =>  {
  return (
    <StyledContainer>
      <NavLink exact activeClassName="active" to="/">
        <Sports/><Dictionary label="matchdays"/>
      </NavLink>
      <NavLink activeClassName="active" to="/results">
        <FormatListNumbered/><Dictionary label="results"/>
      </NavLink>
      <NavLink activeClassName="active" to="/standings">
        <EmojiEventsOutlined/><Dictionary label="standings"/>
      </NavLink>
      <NavLink activeClassName="active" to="/how-to-play">
        <HelpOutline/><Dictionary label="howToPlay"/>
      </NavLink>
    </StyledContainer>
  );
}


const StyledContainer = styled(Box)`
  overflow: hidden;
  background: #5e5c7b;;
  position: relative;
  z-index: 1;
  & > a {
    padding: 16px;
    font-size: 16px;
    color: #f4f6ff;
    font-weight: 400;
    display: flex;
    align-items: center;
    transition: ${props => props.theme.transition.default};
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    & > svg {
      margin-right: 16px;
    }
    &.active ,
    &:hover {
      background: #4f8a8b;
    }
  }
  & > a:not(:last-child) {
    border-bottom: solid 1px #4d4b62;
  }
`;