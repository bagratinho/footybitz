import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface IThemeInterface {
  id: string;
}

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
