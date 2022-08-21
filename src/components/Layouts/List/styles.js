import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ErrContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100vh;

  button {
    padding: 10px;
  }
`;
