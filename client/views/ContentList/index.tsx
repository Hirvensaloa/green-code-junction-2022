import Image from "next/image";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";

import { BLUR_DATA_URL } from "../../constants/utils";
import { useEnergy } from "../../hooks/useEnergy";
import { theme } from "../../styles/theme";
import { Heading4, Text } from "../../styles/typography";
import { ContentType } from "../../types";
import { decrementEnergy } from "../../utils/energy";
import { useFetchFeed } from "./useFetchFeed";

const StyledContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled(Heading4)`
  min-width: 100%;
  line-height: 2rem;
  padding: 0.5rem 0;
  border-radius: 1rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 1rem;
`;

const StyledVideo = styled.video`
  border-radius: 1rem;
  background-color: ${theme.background.secondary};
`;

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  background-color: ${theme.background.secondary};
`;

const ContentPlaceholder = styled(Card)`
  display: flex;
  width: 100%;
  height: 12rem;
  background-color: ${theme.accent.energyYellow}33;
`;

export const ContentList = () => {
  const { feed, loading } = useFetchFeed();
  const { setEnergy } = useEnergy();
  const [revealedIds, setRevealedIds] = useLocalStorage<string[]>(
    "revealedIds",
    []
  );

  const getContentDisplayByType = (type: ContentType, content: string) => {
    switch (type) {
      case "text":
        return (
          <Card>
            <Text>{content}</Text>
          </Card>
        );
      case "image":
        return (
          <StyledImage
            src={content || ""}
            alt="image content"
            width={360}
            height={240}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
          />
        );
      case "video":
        return (
          <StyledVideo width={360} height={240} controls>
            <source src={content} />
          </StyledVideo>
        );
      case "audio":
        return (
          <audio controls>
            <source src={content} />
          </audio>
        );
    }
  };

  const handleRevealContent = async (id: string, cost: number) => {
    if (!revealedIds.includes(id)) {
      const energy = await decrementEnergy(cost);
      setEnergy(energy);
      setRevealedIds((prev: string[]) => prev.concat([id]));
    }
  };

  return (
    <StyledContentList>
      {!loading &&
        feed &&
        feed.map(({ id, title, type, score, content, cost = 100 }) => {
          const isHiddenContent = !revealedIds.includes(id);
          return (
            <div key={id}>
              <Title>{title}</Title>
              {isHiddenContent ? (
                <ContentPlaceholder
                  onClick={() => handleRevealContent(id, cost)}
                ></ContentPlaceholder>
              ) : (
                getContentDisplayByType(type, content)
              )}
            </div>
          );
        })}
    </StyledContentList>
  );
};
