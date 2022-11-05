import Image from "next/image";
import styled from "styled-components";

import { Button } from "../../components/Button";
import { theme } from "../../styles/theme";
import { EnergyIcon } from "../../components/EnergyIcon";
import { Input } from "../../components/Input";
import { Heading3 } from "../../styles/typography";

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.background.secondary};
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
  return (
    <Card>
      <form>
        <Input type="text" placeholder="What's on your mind?" />
        <SubmitButton type="submit">
          <ButtonText $dark={true}>Post</ButtonText>
          <Image
            src="/energy_black.svg"
            alt="energy_black"
            width="16"
            height="24"
          />
        </SubmitButton>
      </form>
    </Card>
  );
};
