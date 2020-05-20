import { css } from 'emotion';

export enum COLOR {
  BLACK = '#252A2E',
  WHITE = '#FFFFFF',
  GRAY = '#D6DDF6',
  GREEN = '#3AC6AB',
  RED = '#B73F65'
}

export const mainCointainer = css`
  padding: 15px;
`;

export const button = css`
  padding: 2px 7px;
  background-color: ${COLOR.GRAY};
  color: ${COLOR.BLACK};
  transition: all .2s;
`;

export const successButton = css`
  background-color: ${COLOR.GREEN};
`;

export const dangerButton = css`
  background-color: ${COLOR.RED};
  color: ${COLOR.WHITE};
`;
