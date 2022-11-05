import Image from 'next/image';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { theme } from '../../styles/theme';
import { Heading3 } from '../../styles/typography';
import FilePicker from '../../components/FilePicker';

const Card = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${theme.background.secondary};
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
  return (
    <Card>
      <form>
        <FilePicker />
        <SubmitButton type='submit'>
          <ButtonText $dark={true}>Post</ButtonText>
          <Image
            src='/energy_black.svg'
            alt='energy_black'
            width='16'
            height='24'
          />
        </SubmitButton>
      </form>
    </Card>
  );
};
