import { css } from 'styled-components/macro'

export const setMaterialIconStyles = ({ isSolid }: any) => {
  return css`
    font-family: ${isSolid ? 'Material Icons' : 'Material Icons Outlined'};
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  `
}
