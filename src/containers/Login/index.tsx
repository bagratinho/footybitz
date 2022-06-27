import { Button, Input } from '@mui/material';
import * as React from 'react';

export interface ILoginProps {
}

export default (props: ILoginProps) => {
  return (
    <div>
      <Input type="text"/>
      <Input type="password"/>
      <Button>Log in</Button>
    </div>
  );
}
