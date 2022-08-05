import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import Dictionary from 'components/Dictionary';
import * as React from 'react';

export interface IPredictionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children: any;
  isLoading: boolean;
}

export const PredictionConfirmation = (props: IPredictionConfirmationProps) => {
  const theme = useTheme();
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.isLoading ? undefined : props.onClose}
      transitionDuration={{
        enter: theme.transitions.duration.enteringScreen,
        exit: 0,
      }}
    >
      <DialogTitle>
        <Dictionary
          label="predictionConfirmationTitle"
        />
      </DialogTitle>
      <DialogContent
        sx={{ width: 500 }}
      >
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClose}
          disableElevation
          variant="text"
          color="secondary"
          disabled={props.isLoading}
        >
          <Dictionary label="cancel"/>
        </Button>
        <Button
          onClick={props.onSave}
          variant="contained"
          disableElevation
          color="primary"
          disabled={props.isLoading}
        >
          <Dictionary label="confirm"/>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
