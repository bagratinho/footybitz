import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from "@mui/material";
import Dictionary from "components/Dictionary";
import messages from "components/Dictionary/messages";

export interface IConfirmationPromptProps {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titleLabel: keyof typeof messages;
  titleValues?: Object;
  descriptionLabel?: keyof typeof messages;
  descriptionValues?: Object;
}

const ConfirmationPrompt = (props: IConfirmationPromptProps) =>  {
  const theme = useTheme();
  return (
    <Dialog
      open={!!props.isOpen}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      transitionDuration={{
        enter: theme.transitions.duration.enteringScreen,
        exit: 0,
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Dictionary label={props.titleLabel} values={props.titleValues}/>
      </DialogTitle>
      <DialogContent>
        {props.descriptionLabel ?
        <DialogContentText id="alert-dialog-description">
          <Dictionary label={props.descriptionLabel} values={props.descriptionValues}/>
        </DialogContentText> : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClose}
          variant="outlined"
          color="secondary"
          disableElevation
        >
          <Dictionary label="cancel"/>
        </Button>
        <Button
          onClick={props.onConfirm}
          variant="contained"
          color="secondary"
          disableElevation
        >
          <Dictionary label="confirm"/>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationPrompt;
