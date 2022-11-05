import Head from "next/head";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { theme } from "../styles/theme";
import { activeContentState } from "../recoil";

const Body = styled.main`
  position: relative;
  height: 100%;
  color: ${theme.foreground.primary};
  background-color: ${theme.background.primary};
`;

const Content = styled.section`
  width: 100vw;
  padding: 1rem;
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
        <Content>{activeContent}</Content>
      </Body>
    </>
  );
}
