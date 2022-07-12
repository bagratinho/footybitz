import * as React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";



export interface INumberInputProps {
  onChange: (value: number) => void;
  label: string;
  value: number;
}

export default function NumberInput (props: INumberInputProps) {
  const add = () => {
    console.log("Asds", props.value)
    const newValue = props.value + 1;
    props.onChange(newValue);
  };

  const reduce = () => {
    const newValue = props.value - 1;
    props.onChange(newValue);
  };

  return (
    <StyledContainer>
      <TextField
        sx={{ display: "flex", pointerEvents: "none", width: "100%" }}
        margin="normal"
        label={props.label}
        value={props.value}
        type="text"
        variant="outlined"
        color="secondary"
        InputProps={{
          startAdornment: (
            <IconButton
              onClick={reduce}
              size="medium"
              color="secondary"
              className="reduce"
              sx={{ pointerEvents: "all" }}
            >
              <ExpandMore fontSize="inherit" />
            </IconButton>
          ),
          componentsProps: {
            input: {
              style: {
                textAlign: "center",
              },
            },
          },
          endAdornment: (
            <IconButton
              onClick={add}
              size="medium"
              color="secondary"
              className="add"
              sx={{ pointerEvents: "all" }}
            >
              <ExpandLess fontSize="inherit" />
            </IconButton>
          ),
        }}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`
