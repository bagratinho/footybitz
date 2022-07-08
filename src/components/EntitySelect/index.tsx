import { Autocomplete, Box, TextField } from '@mui/material';
import messages from 'components/Dictionary/messages';
import { EntityImage, EntityImagesMap } from 'components/EntityImage';
import * as React from 'react';
import { injectIntl } from 'react-intl';

export interface IEntitySelectProps {
  type: "competition" | "team";
  value: string;
  onOptionChange: (e: React.SyntheticEvent, value: IEntitySelectOption) => void;
  intl: any;
}

export interface IEntitySelectOption {
  id: string;
  img: string;
  name: string;
}

const EntitySelect = (props: IEntitySelectProps) => {
  const entities = EntityImagesMap[props.type];
  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={entities}
      autoHighlight
      color="secondary"
      getOptionLabel={(option: IEntitySelectOption) => option.name}
      value={entities.find(i => i.id === props.value)}
      onChange={props.onOptionChange}
      renderOption={(p, option) => (
        <Box component="li" sx={{ }} {...p}>
          <EntityImage
            id={option.id}
            type={props.type}
            size="small"
            sx={{ mr: 1 }}
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="dense"
          color="secondary"
          label={props.intl.formatMessage(messages.avatar)}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default injectIntl(EntitySelect);