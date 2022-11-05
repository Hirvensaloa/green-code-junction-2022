import styled from "styled-components";

import { Button } from "../../components/Button";
import { theme } from "../../styles/theme";
import { EnergyIcon } from "../../components/EnergyIcon";
import { MultilineInput } from "../../components/Input";
import { Heading3, Text } from "../../styles/typography";
import { useActiveContent } from "../../hooks/useActiveContent";
import { useEnergy } from "../../hooks/useEnergy";

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.background.secondary};
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.accent.energyYellow}33;

  > :first-child {
    margin-right: 1rem;
  }
`;

const Container = styled.section`
  > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled(MultilineInput)`
  width: 100%;
  height: 40vh;
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${theme.accent.electricBlue};
`;

const ButtonText = styled(Heading3)``;

export const TextPost = () => {
  const { decreaseEnergy } = useEnergy();
  const { setDefaultContent } = useActiveContent();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    decreaseEnergy(100);
    setDefaultContent();
  };

  return (
    <Container>
      <InfoCard>
        <EnergyIcon type="flat" w={24} h={32} />
        <Text>
          Text posts are by far the most energy efficient type of content!
        </Text>
      </InfoCard>
      <Card>
        <form onSubmit={handleSubmit}>
          <StyledInput type="text" placeholder="What's on your mind?" />
          <SubmitButton type="submit">
            <ButtonText $dark={true}>Post</ButtonText>
            <EnergyIcon type="black" />
          </SubmitButton>
        </form>
      </Card>
    </Container>
  );
};
