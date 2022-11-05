import Image from 'next/image';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { theme } from '../../styles/theme';
import { Heading3, Text } from '../../styles/typography';
import FilePicker from '../../components/FilePicker';
import { EnergyIcon } from '../../components/EnergyIcon';
import { Input } from '../../components/Input';
import { useUploadFile } from '../../hooks/useFileUpload';

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

const SubmitButton = styled(Button)`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${theme.accent.electricBlue};
`;

const ButtonText = styled(Heading3)``;

export const ImagePost = () => {
  const { title, setTitle, file, setFile, loading, error, uploadFile } =
    useUploadFile();

  return (
    <Container>
      <InfoCard>
        <EnergyIcon type='flat' w={24} h={32} />
        <EnergyIcon type='flat' w={24} h={32} />
        <EnergyIcon type='flat' w={24} h={32} />
        <Text>
          Images tell a thousand words, but they cost a lot of energy compared
          to text!
        </Text>
      </InfoCard>
      <Card>
        <FilePicker setFile={setFile} types={['png', 'jpeg', 'jpg', 'svg']} />
        <Input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind son?"
        />
        <SubmitButton
          disabled={!file || !title}
          onClick={async () => await uploadFile(file, title)}
        >
          <ButtonText $dark={true}>Post</ButtonText>
          <Image
            src='/energy_black.svg'
            alt='energy_black'
            width='16'
            height='24'
          />
        </SubmitButton>
      </Card>
    </Container>
  );
};
