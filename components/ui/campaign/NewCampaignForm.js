import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { parseString } from 'loader-utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';

const NewCampaignForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [minimumContribution, setMinimumContribution] = useState('10');
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(parseString(minimumContribution))
        .send({
          from: accounts[0],
        });

      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(true);
  };
  return (
    <>
      <Heading as='h3' fontSize='md'>
        Create Campaign
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl id='amount' mt={5}>
          <FormLabel>Minimum Contribution</FormLabel>
          <NumberInput
            value={minimumContribution}
            min={10}
            onChange={(value) => setMinimumContribution(value)}
            isRequired
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
        <Button
          my={3}
          colorScheme='blue'
          variant='outline'
          type='submit'
          isLoading={loading}
          loadingText='Creating'
          width='100%'
        >
          Create!
        </Button>
      </form>
    </>
  );
};

export default NewCampaignForm;
