import { IThemeInterface } from "styles/styled-components";

export default {
  id: "base",
  transition: {
    default: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    duration: "300ms",
    function: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  font: {
    family: {
      primary: "Roboto",
      secondary: "Arial",
    },
    size: 10,
    lineHeightRatio: 1.5,
  },
  spacing: {
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 32,
    xxl: 64,
  },
  colors: {
    color1: "#FF5A5F",
    color2: "#00A699",
    color3: "#FC642D",
    color4: "#484848",
    color5: "#767676",
    color6: "#FFFFFF",
    color7: "#E2E2E2",
  },
  border: {
    radius: {
      small: 3,
      medium: 5,
      large: 10,
      extraLarge: 20,
    },
    width: {
      small: 1,
      medium: 3,
      large: 5,
      extraLarge: 10,
    },
  },
  shadow: {
    text: `0px 2px 8px rgba(0, 0, 0, 1) `,
    box: `rgba(0, 0, 0, 0.15) 0px 2px 8px`,
  }
} as IThemeInterface;