import styled from "styled-components";
import Image from "next/image";

import { Button } from "../../components/Button";
import { theme } from "../../styles/theme";
import { EnergyIcon } from "../../components/EnergyIcon";
import { Input } from "../../components/Input";

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.background.secondary};
`;

export const TextPost = () => {
  return (
    <Card>
      <form>
        <Input type="text" placeholder="What's on your mind?" />
        <Button type="submit">
          Post <EnergyIcon />
        </Button>
      </form>
    </Card>
  );
};
