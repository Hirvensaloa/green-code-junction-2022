import styled from "styled-components";
import { CreateContentOpener } from "../../components/CreateContent";

import { theme } from "../../styles/theme";
import { Text } from "../../styles/typography";

const StyledContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.background.secondary};
`;

export const ContentList = () => (
  <>
    <StyledContentList>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Card>
      ))}
    </StyledContentList>
    <CreateContentOpener />
  </>
);
