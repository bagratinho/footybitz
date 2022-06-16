import * as React from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";



export interface INumberInputProps {
}

export default function NumberInput (props: INumberInputProps) {
  const arr = new Array(11).fill("").map((item: number, index: number) => index ? String(index) : item);
  const [value, setValue] = React.useState<"" | number>("");

  const handleInputChange = (e: any) => {
    if (arr.indexOf(e.target.value) !== -1 && e.target.value < 11 && value > -1) {
      setValue(e.target.value);
    }
  };


  const add = () => {
    const newValue = value === "" ? 0 : Number(value) + 1;
    if (newValue <= 10) {
      setValue(newValue);
    }
  };

  const reduce = () => {
    const newValue = value === "" ? 0 : Number(value) - 1;
    if (newValue >= 0) {
      setValue(newValue);
    }
  };

  return (
    <StyledContainer>
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
        onChange={handleInputChange}
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

const StyledContainer = styled(Box)`
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
    color: #fbd46d;
    color: ${props => props.theme.palette.secondary.main};
    font-weight: 700;
    &::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 52px;
  background: ${props => props.theme.palette.divider};
  border-radius: 26px;
  padding: 2px;
`
