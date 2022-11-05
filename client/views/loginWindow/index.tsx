import { theme } from "../../styles/theme";
import styled from "styled-components";

// create a styled div to hold the input fields
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 50%;

  height: 50%;
  max-width: 30rem;
  // center from top to bottom
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 25% 25% 25% 25%;
  border-radius: 10px;
  background-color: ${theme.background.secondary};
`;

// create a styled input field to be used in the form
const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  align-self: center;
  margin: 0rem;
  width: 80%;
  border: 1px solid ${theme.background.primary};
`;

export const LoginWindow = () => {
  return (
    <StyledForm>
      <StyledInput type="text" placeholder="Username" />
      <StyledInput type="password" placeholder="Password" />
    </StyledForm>
  );
};
