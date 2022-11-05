import Head from "next/head";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { theme } from "../styles/theme";
import { activeContentState } from "../recoil";

const Body = styled.main`
  position: relative;
  height: 100%;
  width: 100vw;
  padding: 1rem;
  color: ${theme.foreground.primary};
  background-color: ${theme.background.primary};
`;

const EnergyBarContainer = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem 1rem 1.5rem 1rem;
  background-color: ${theme.background.primary};
  box-shadow: 0 2px 4px ${theme.background.primary};
`;

const EnergyBar = styled.div`
  height: 2rem;
  border-radius: 1rem;
  background-color: ${theme.background.secondary};
`;

export default function Home() {
  const activeContent = useRecoilValue(activeContentState);
  return (
    <>
      <Head>
        <title>Boiler</title>
        <meta
          name="description"
          content="Next generation social media for the environmentally aware"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <EnergyBarContainer>
          <EnergyBar />
        </EnergyBarContainer>
        {activeContent}
      </Body>
    </>
  );
}
