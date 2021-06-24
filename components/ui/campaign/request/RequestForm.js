import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { parseString } from 'loader-utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import web3 from '../../../../ethereum/web3';
import campaign from '../../../../ethereum/campaign';

const RequestForm = ({ address }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [recipient, setRecipient] = useState('');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(parseString(value), 'ether'),
          address
        )
        .send({ from: accounts[0] });

      router.push(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(true);
  };
  return (
    <>
      <Heading as='h3' fontSize='md'>
        Create a request
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl id='description'>
          <FormLabel>Description</FormLabel>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              placeholder='Description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              isRequired
            />
          </InputGroup>
        </FormControl>
        <FormControl id='amount' mt={5}>
          <FormLabel>Value (ether)</FormLabel>
          <NumberInput
            value={value}
            min={10}
            onChange={(value) => setValue(value)}
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
        <FormControl id='recipient'>
          <FormLabel>Recipient</FormLabel>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              placeholder='Recipient'
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              isRequired
            />
          </InputGroup>
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

export default RequestForm;
