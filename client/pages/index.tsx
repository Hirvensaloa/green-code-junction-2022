import Head from "next/head";
import styled from "styled-components";

import { theme } from "../styles/theme";

const Body = styled.main`
  height: 100%;
  color: ${theme.foreground.primary};
  background-color: ${theme.background.primary};
`;

const Content = styled.section`
  width: 100vw;
  padding: 1rem;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.background.secondary};
`;

export default function Home() {
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
        <Content>
          <CardList>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Card>
            ))}
          </CardList>
        </Content>
      </Body>
    </>
  );
}
