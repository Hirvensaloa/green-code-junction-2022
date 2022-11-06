import Image from "next/image";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";

import { theme } from "../../styles/theme";
import { Heading4, Text } from "../../styles/typography";
import { ContentType } from "../../types";
import { useFetchFeed } from "./useFetchFeed";

const StyledContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Title = styled(Heading4)`
  min-width: 100%;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const ContentPlaceholder = styled.div`
  width: 10rem;
  height: 7rem;
`;

const ContentArea = styled.section`
  display: flex;
  justify-content: end;
  > img {
    border-radius: 1rem;
  }
`;

const Card = styled.div<{ isHiddenContent?: boolean }>`
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  background-color: ${(p) =>
    p.isHiddenContent
      ? `${theme.accent.energyYellow}33`
      : theme.background.secondary};
`;

export const ContentList = () => {
  const { feed, loading } = useFetchFeed();
  const { decreaseEnergy } = useEnergy();
  const [revealedIds, setRevealedIds] = useLocalStorage<string[]>(
    "revealedIds",
    []
  );

  const getContentDisplayByType = (type: ContentType, content: string) => {
    switch (type) {
      case "text":
        return <Text>{content}</Text>;
      case "image":
        return (
          <StyledImage
            src={content || ""}
            alt="image content"
            width={160}
            height={112}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority
          />
        );
      case "video":
        return <video src={content} />;
      case "audio":
        return (
          <audio controls>
            <source src={content} />
          </audio>
        );
    }
  };

  const handleRevealContent = (id: string, cost: number) => {
    decreaseEnergy(cost);
    setRevealedIds((prev: string[]) => prev.concat([id]));
  };

  return (
    <StyledContentList>
      {!loading &&
        feed &&
        feed.map(({ id, title, type, score, content, cost = 100 }) => {
          const isHiddenContent = !revealedIds.includes(id);
          return (
            <Card
              key={id}
              isHiddenContent={isHiddenContent}
              onClick={() => handleRevealContent(id, cost)}
            >
              <Title>{title}</Title>
              <ContentArea>
                {isHiddenContent ? (
                  <ContentPlaceholder>Reveal me</ContentPlaceholder>
                ) : (
                  getContentDisplayByType(type, content)
                )}
              </ContentArea>
            </Card>
          );
        })}
    </StyledContentList>
  );
};
