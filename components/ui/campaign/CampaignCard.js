import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

const CampaignCard = ({ address }) => {
  return (
    <Box p='5' maxW='60rem' borderWidth='1px' mb={3}>
      <Heading as='h1' fontSize='md'>{address}</Heading>
      <Link href={`campaigns/${address}`} passHref>
        <Text mt={2} fontSize='sm' fontWeight='semibold' lineHeight='short' cursor='pointer'>
          View campaign
        </Text>
      </Link>
    </Box>
  );
};

export default CampaignCard;
