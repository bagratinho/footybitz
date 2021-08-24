import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export interface IThemeInterface {
  id: string;
  transition: {
    default: string;
    duration: string;
    function: string;
  };
  font: {
    family: {
      primary: string;
      secondary: string;
    };
    size: number;
    lineHeightRatio: number;
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  colors: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    color7: string;
  };
  border: {
    radius: {
      small: number;
      medium: number;
      large: number;
      extraLarge: number;
    };
    width: {
      small: number;
      medium: number;
      large: number;
      extraLarge: number;
    };
  };
  shadow: {
    text: string;
    box: string;
  };
  muiTheme: any,
}

export type ISpacing = "xs" | "s" | "m" | "l" | "xl" | "xxl";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, withTheme, ThemeProvider };
export default styled;
