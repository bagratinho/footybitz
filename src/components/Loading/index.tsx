import { Box, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { transparentize } from "utils"

export interface IContainerProps {
  children?: any;
}

const Container = (props: IContainerProps) => {
  return (
    <StyledContainer>
      <div className="loader"></div>
    </StyledContainer>
  );
}


const LoaderColor = "#781df2";
const LoaderSize = 60;
const LoaderOffset = 5;
const LoaderTiming = "ease-in-out";

const pulsA = keyframes`
  0% { box-shadow: inset 0 0 0 ${LoaderOffset}px ${LoaderColor}; opacity: 1; }
  50%, 100% { box-shadow: inset 0 0 0 0 ${LoaderColor}; opacity: 0; }
`;

const pulsB = keyframes`
  0%, 50% { box-shadow: 0 0 0 0 ${LoaderColor}; opacity: 0; }
  100% { box-shadow: 0 0 0 ${LoaderOffset}px ${LoaderColor}; opacity: 1; }
`;

const StyledContainer = styled(Box)`
  .loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    width: ${LoaderSize}px;
    height: ${LoaderSize}px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      animation-duration: 1.4s;
      animation-iteration-count: infinite;
      animation-timing-function: ${LoaderTiming};
      filter: drop-shadow(0 0 ${LoaderOffset / 2.25}px ${props => transparentize(props.theme.palette.primary.main, 0.75)});
    }
    &:before {
      width: 100%;
      padding-bottom: 100%;
      box-shadow: inset 0 0 0 ${LoaderOffset}px ${LoaderColor};
      animation-name: ${pulsA};
    }
    &:after {
      width: calc(100% - ${LoaderOffset * 2}px);
      padding-bottom: calc(100% - ${LoaderOffset * 2}px);
      box-shadow: 0 0 0 0 ${LoaderColor};
      animation-name: ${pulsB};
    }
  }

`;


export default Container;

