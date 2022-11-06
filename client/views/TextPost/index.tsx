import {
  FormEvent,
  ChangeEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";

import { Button } from "../../components/Button";
import { theme } from "../../styles/theme";
import { EnergyIcon } from "../../components/EnergyIcon";
import { MultilineInput, TitleInput } from "../../components/Input";
import { ButtonText, headingBase, Text } from "../../styles/typography";
import { useActiveContent } from "../../hooks/useActiveContent";
import { useEnergy } from "../../hooks/useEnergy";
import { decrementEnergy } from "../../utils/energy";

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

const Line = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.background.primary};
`;

const InputContent = styled(MultilineInput)`
  width: 100%;
  height: 40vh;
  padding: 1.5rem 0;
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

const StyledText = styled(ButtonText)`
  font-size: 1.5rem;
`;

export const TextPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { setDefaultContent } = useActiveContent();
  const { setEnergy } = useEnergy();

  const getChangeHandler =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      setter(value);
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title", title);
    body.append("content", content);
    fetch("http://localhost:7777/api/upload/text", {
      method: "POST",
      body,
    }).then(async (response) => {
      const energy = await decrementEnergy(100);
      setEnergy(energy);
      setDefaultContent();
    });
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
          <TitleInput
            value={title}
            type="text"
            id="title"
            onChange={getChangeHandler(setTitle)}
            placeholder="Give a title for your post"
          />
          <Line />
          <InputContent
            value={content}
            type="text"
            id="content"
            onChange={getChangeHandler(setContent)}
            placeholder="What's on your mind?"
          />
          <SubmitButton type="submit">
            <StyledText $dark={true}>Post</StyledText>
            <EnergyIcon type="black" />
          </SubmitButton>
        </form>
      </Card>
    </Container>
  );
};
