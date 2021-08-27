import * as React from "react";
import { Box } from "@material-ui/core";
import Measurer from "components/Measurer";

export interface IStickyBarProps {
  className?: string;
  children: any;
  position?: "top" | "bottom";
}

export default (props: IStickyBarProps) =>  {
  const [dimensions, setDimensions] = React.useState({ width: 0 });
  const onMeasure = (dimensions: { width: number }) => {
    setDimensions(dimensions);
  };
  return (
    <Measurer className={props.className} onMeasure={onMeasure}>
      <Box
        top={props.position === "top" ? 0 : "auto"}
        bottom={props.position === "bottom" ? 0 : "auto"}
        position="fixed"
        style={{ width: dimensions.width }}
        zIndex={1}
      >
        {props.children}
      </Box>
    </Measurer>
  );
}
