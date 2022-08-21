import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  font-size: 1.4em;
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #454545;
  ${({ isPaused }) =>
    isPaused &&
    css`
      opacity: 0.6;
    `}
  img {
    width: 18px;
    height: 18px;
    margin-left: 5px;
  }
`;
