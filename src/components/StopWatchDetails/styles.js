import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const CustomButton = styled.div`
  cursor: pointer;
  padding: 5px;
  color: #0062cc;

  ${({ isDelete }) =>
    isDelete &&
    css`
      color: red;
    `}
`;

export const FlexSpacedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LapsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
