import * as React from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";



export interface INumberInputProps {
  onChange: (value: number) => void;
  isHighlighted?: boolean;
  value?: number;
}

export default function NumberInput (props: INumberInputProps) {
  const { value } = props;
  const add = () => {
    const newValue = Number(typeof value === "undefined" ? -1 : value) + 1;
    props.onChange(newValue);
  };

  const reduce = () => {
    const newValue = Number(value) - 1;
    props.onChange(newValue);
  };

  return (
    <StyledContainer isHighlighted={props.isHighlighted}>
      <IconButton
        onClick={add}
        size="medium"
        disabled={value === 10}
        color="secondary"
      >
        <ExpandLess fontSize="inherit" />
      </IconButton>
      <InputBase
        value={value}
        type="number"
        placeholder="&mdash;"
        disabled
        sx={{
          fontFamily: "Kdam Thmor Pro",
          color: "white !important",
        }}
      />
      <IconButton
        onClick={reduce}
        aria-label="delete"
        size="medium"
        disabled={!value}
        color="secondary"
      >
        <ExpandMore fontSize="inherit" />
      </IconButton>
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)<{isHighlighted?: boolean}>`
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input {
    text-align: center;
    font-size: 24px;
    padding: 0;
    height: 30px;
    color: ${props => props.theme.palette.secondary.main};
    font-weight: 700;
    &::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44px;
  transition: ${props => `background-color ${props.theme.transitions.duration.standard}ms ${props.theme.transitions.easing.easeIn}`};
  background: ${props => props.isHighlighted ? "#607d0c" : props.theme.palette.divider};
  border-radius: 26px;
  padding: 2px;
`
