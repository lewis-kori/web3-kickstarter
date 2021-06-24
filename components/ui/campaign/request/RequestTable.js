import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import web3 from '../../../../ethereum/web3';

const RequestTable = ({ requests, approversCount }) => {
  const footerMessage =
    requests.length > 0
      ? 'Campaign Requests'
      : 'Campaign has no requests at the moment';

  return (
    <Table variant='simple'>
      <TableCaption>{footerMessage}</TableCaption>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Description</Th>
          <Th isNumeric>Amount</Th>
          <Th>Recipient</Th>
          <Th isNumeric>Approval count</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr></Tr>
        {requests.length > 0
          ? requests.map((request, index) => {
              return (
                <Tr key={index}>
                  <Td>{index}</Td>
                  <Td>{request['description']}</Td>
                  <Td isNumeric>
                    {web3.utils.fromWei(request['value'], 'ether')}
                  </Td>
                  <Td>{request['recipient']}</Td>
                  <Td isNumeric>
                    {request['approvalCount']} / {approversCount}
                  </Td>
                </Tr>
              );
            })
          : null}
      </Tbody>
    </Table>
  );
};

export default RequestTable;
