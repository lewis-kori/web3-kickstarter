import React from 'react';
import { chakra, Box, Flex, useColorModeValue, Link } from '@chakra-ui/react';

import { AiOutlineTwitter, AiOutlineLink } from 'react-icons/ai';
const CampaignDetailCard = ({ feature }) => {
  return (
    <>
      <Box
        w='full'
        maxW='sm'
        mx='auto'
        px={4}
        py={3}
        shadow='md'
        rounded='md'
        h='100%'
        bg='papayawhip'
      >
        <Flex justifyContent='space-between' alignItems='center'>
          <chakra.span fontSize='sm' color='gray.800'>
            {feature.meta}
          </chakra.span>
          <chakra.span
            bg='green.200'
            color={useColorModeValue('brand.800', 'brand.900')}
            px={3}
            py={1}
            rounded='full'
            textTransform='uppercase'
            fontSize='xs'
            {...feature.style}
          >
            {feature.header}
          </chakra.span>
        </Flex>

        <Box>
          <chakra.p fontSize='sm' mt={2} color='gray.600'>
            {feature.description}
          </chakra.p>
        </Box>

        <Box>

          <Flex alignItems='center' justifyContent='center' mt={4}>
            <Link
              mr={2}
              color='gray.800'
              _hover={{ color: 'gray.700' }}
              cursor='pointer'
            >
              <AiOutlineTwitter />
            </Link>

            <Link
              mr={2}
              color='gray.800'
              _hover={{ color: 'gray.700' }}
              cursor='pointer'
            >
              <AiOutlineLink />
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default CampaignDetailCard;
