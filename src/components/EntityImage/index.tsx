import { Avatar } from '@mui/material';
import * as React from 'react';
import { Competitions } from "./images/Competitions"
import { Teams } from "./images/Teams"

export interface IEntityImageProps {
  type: "competition" | "team";
  id: string;
  size: "auto" | "small" | "medium" | "large",
  sx: any;
}

export const EntityImagesMap = {
  competition: Competitions,
  team: Teams,
}

const sizeMap = {
  auto: {},
  small: { width: 32, height: 32 },
  medium: { width: 64, height: 64 },
  large: { width: 100, height: 100 },
}

export function EntityImage (props: IEntityImageProps) {
  const img = EntityImagesMap[props.type].find(i => i.id === props.id)!.img;
  console.log()
  return (
    <Avatar
      sx={{
        borderRadius: 0,
        ...sizeMap[props.size],
        ...props.sx,
      }}
      src={img}
    />
  );
}
