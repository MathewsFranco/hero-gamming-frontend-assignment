import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const CustomButton = styled.button`
  margin: auto;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  border: none;
  position: relative;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #454545;
  color: #ffffff;
  user-select: none;

  ${({ isPaused, playButton }) => {
    if (playButton) {
      return css`
        color: ${isPaused ? '#2bda5f' : 'red'};
        background: ${isPaused ? '#022402' : '#3f0106'};
      `;
    }
  }}

  &:focus {
    outline: none;
  }
  &:hover {
    filter: opacity(0.8);
  }
  &:disabled {
    filter: opacity(0.6);
  }

  &:before {
    border-radius: 50%;
    width: 90%;
    height: 90%;
    border: 1.5px solid black;
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
