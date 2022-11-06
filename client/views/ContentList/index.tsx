import Image from "next/image";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { EnergyIcon } from "../../components/EnergyIcon";

import { BLUR_DATA_URL } from "../../constants/utils";
import { useEnergy } from "../../hooks/useEnergy";
import { theme } from "../../styles/theme";
import { Heading4, ButtonText, Text } from "../../styles/typography";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12rem;
  background-color: ${theme.accent.energyYellow}33;
`;

const RevealCostIndicator = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  ${ButtonText} {
    margin-left: 1rem;
    font-size: 2.5rem;
  }
`;

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

const getPlaceholderByType = (type: ContentType) => {
  switch (type) {
    case "text":
      return (
        <Image src="/text_white.png" width="64" height="64" alt="text_white" />
      );
    case "image":
      return (
        <Image
          src="/image_white.png"
          width="64"
          height="64"
          alt="image_white"
        />
      );
    case "video":
      return (
        <Image
          src="/video_white.png"
          width="64"
          height="64"
          alt="video_white"
        />
      );
    case "audio":
      return (
        <Image
          src="/audio_white.png"
          width="64"
          height="64"
          alt="audio_white"
        />
      );
  }
};

const getCostByType = (type: ContentType) => {
  switch (type) {
    case "text":
      return 10;
    case "image":
      return 50;
    case "video":
      return 200;
    case "audio":
      return 50;
  }
};

export const ContentList = () => {
  const { feed, loading } = useFetchFeed();
  const { setEnergy, remainingEnergy, setDisplayNoEnergy } = useEnergy();
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

      if (energy === remainingEnergy) {
        setDisplayNoEnergy(true);
      } else {
        setEnergy(energy);
        setRevealedIds((prev: string[]) => prev.concat([id]));
      }
    }
  };

  return (
    <StyledContentList>
      {!loading &&
        feed &&
        feed.map(({ id, title, type, content }) => {
          const isHiddenContent = !revealedIds.includes(id);
          return (
            <div key={id}>
              <Title>{title}</Title>
              {isHiddenContent ? (
                <ContentPlaceholder
                  onClick={() => handleRevealContent(id, getCostByType(type))}
                >
                  {getPlaceholderByType(type)}
                  <RevealCostIndicator>
                    <EnergyIcon w={32} h={48} />
                    <ButtonText>{getCostByType(type)}</ButtonText>
                  </RevealCostIndicator>
                </ContentPlaceholder>
              ) : (
                getContentDisplayByType(type, content)
              )}
            </div>
          );
        })}
    </StyledContentList>
  );
};
