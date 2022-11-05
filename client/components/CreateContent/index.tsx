import Image from "next/image";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { animated, useSpring } from "react-spring";

import { EnergyCostIndicator } from "../EnergyCostIndicator";
import { Button } from "../Button";
import { theme } from "../../styles/theme";
import { TextPost } from "../../views/TextPost";
import { ContentList } from "../../views/ContentList";
import { activeContentState } from "../../recoil";

const contentActions = [
  {
    contentType: "text",
    contentView: <TextPost />,
    icon: <Image src="/text.svg" alt="text" width="16" height="16" />,
    cost: 1,
  },
  {
    contentType: "image",
    contentView: <TextPost />,
    icon: <Image src="/image.svg" alt="image" width="16" height="16" />,
    cost: 2,
  },
  {
    contentType: "video",
    contentView: <TextPost />,
    icon: <Image src="/video.svg" alt="video" width="16" height="16" />,
    cost: 4,
  },
  {
    contentType: "sound",
    contentView: <TextPost />,
    icon: <Image src="/sound.svg" alt="sound" width="16" height="16" />,
    cost: 2,
  },
];

const BaseContentButton = styled(Button)`
  background-color: ${theme.accent.electricBlue};
  border-radius: 100%;
`;

interface MenuButtonProps {
  $open: boolean;
  $itemClicked: boolean;
}

const MenuOpenerButton = styled(BaseContentButton)<MenuButtonProps>`
  width: 2rem;
  height: 2rem;
  padding: 1.5rem;
  transition: transform 300ms;
  transform-origin: center;
  transform: ${(p) =>
    p.$open ? "rotate3d(0, 0, 1, 45deg)" : "rotate3d(0, 0, 1, 0deg)"};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 1rem;
  bottom: 1rem;
  right: 1.5rem;
`;

const ContentMenu = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
`;

const ContentButton = styled(BaseContentButton)`
  position: relative;
  width: 1rem;
  height: 1rem;
  padding: 1rem;
`;

export const CreateContentOpener = () => {
  const [contentMenuOpen, setContentMenuOpen] = useState(false);
  const [menuItemClicked, setMenuItemClicked] = useState(false);

  const setActiveContent = useSetRecoilState(activeContentState);

  const menuButtonSpring = useSpring({
    transform: menuItemClicked
      ? "translate3d(-70vw, 0, 0)"
      : "translate3d(0, 0, 0)",
  });

  const handleMenuClick = () => {
    if (menuItemClicked) {
      setMenuItemClicked(false);
      setActiveContent(<ContentList />);
    } else {
      setContentMenuOpen(!contentMenuOpen);
    }
  };

  const handleMenuItemClick = (contentView: ReactNode) => {
    setMenuItemClicked(true);
    setActiveContent(contentView);
    setContentMenuOpen(false);
  };

  return (
    <ButtonWrapper>
      <animated.div style={menuButtonSpring}>
        <MenuOpenerButton
          $open={contentMenuOpen}
          $itemClicked={menuItemClicked}
          onClick={handleMenuClick}
        >
          {menuItemClicked ? (
            <Image src="/home.svg" alt="home" width="32" height="32" />
          ) : (
            <Image src="/add.svg" alt="add" width="32" height="32" />
          )}
        </MenuOpenerButton>
      </animated.div>
      <ContentMenu>
        {contentMenuOpen && (
          <>
            {contentActions.map(({ contentType, contentView, icon, cost }) => (
              <ContentButton
                key={contentType}
                onClick={() => handleMenuItemClick(contentView)}
              >
                {icon}
                <EnergyCostIndicator amount={cost} />
              </ContentButton>
            ))}
          </>
        )}
      </ContentMenu>
    </ButtonWrapper>
  );
};
