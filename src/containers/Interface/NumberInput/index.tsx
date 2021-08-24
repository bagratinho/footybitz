import * as React from "react";
import styled from "styles/styled-components";
import { IconButton, InputBase } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";



export interface INumberInputProps {
}

export function NumberInput (props: INumberInputProps) {
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

const StyledContainer = styled.div`
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
    color: ${props => props.theme.muiTheme.palette.secondary.main};
    font-weight: 700;
    &::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 52px;
  background: ${props => props.theme.muiTheme.palette.divider};
  border-radius: 26px;
  padding: 2px;
`
