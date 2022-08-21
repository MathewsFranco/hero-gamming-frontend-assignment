import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-top: 1px solid #454545;
  ${({ isSlowestLap, isFastestLap }) => {
    if (isSlowestLap) {
      return css`
        color: red;
      `;
    }
    if (isFastestLap) {
      return css`
        color: #2bda5f;
      `;
    }
  }}
`;
