import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import { EnergyCostIndicator } from "../EnergyCostIndicator";
import { Button } from "../Button";
import { theme } from "../../styles/theme";

const contentActions = [
  {
    contentType: "text",
    action: () => {},
    icon: <Image src="/text.svg" alt="text" width="16" height="16" />,
    cost: 1,
  },
  {
    contentType: "image",
    action: () => {},
    icon: <Image src="/image.svg" alt="image" width="16" height="16" />,
    cost: 2,
  },
  {
    contentType: "video",
    action: () => {},
    icon: <Image src="/video.svg" alt="video" width="16" height="16" />,
    cost: 4,
  },
  {
    contentType: "sound",
    action: () => {},
    icon: <Image src="/sound.svg" alt="sound" width="16" height="16" />,
    cost: 2,
  },
];

const BaseContentButton = styled(Button)`
  background-color: ${theme.accent.electricBlue};
  border-radius: 100%;
`;

const MenuOpenerButton = styled(BaseContentButton)<{ $open: boolean }>`
  width: 2rem;
  height: 2rem;
  padding: 1.5rem;
  transition: transform 300ms;
  transform-origin: center;
  transform: ${(p) =>
    p.$open ? "rotate3d(0, 0, 1, 45deg)" : "rotate3d(0, 0, 1, 0deg)"};
`;

const ContentMenu = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 1rem;
  bottom: 1rem;
  right: 1.5rem;
`;

const ContentButton = styled(BaseContentButton)`
  position: relative;
  width: 1rem;
  height: 1rem;
  padding: 1rem;
`;

export const CreateContentOpener = () => {
  const [contentMenuOpen, setContentMenuOpen] = useState(false);
  return (
    <ContentMenu>
      <MenuOpenerButton
        $open={contentMenuOpen}
        onClick={() => setContentMenuOpen(!contentMenuOpen)}
      >
        <Image src="/add.svg" alt="add" width="32" height="32" />
      </MenuOpenerButton>
      {contentMenuOpen && (
        <>
          {contentActions.map(({ contentType, action, icon, cost }) => (
            <ContentButton key={contentType} onClick={action}>
              {icon}
              <EnergyCostIndicator amount={cost} />
            </ContentButton>
          ))}
        </>
      )}
    </ContentMenu>
  );
};
