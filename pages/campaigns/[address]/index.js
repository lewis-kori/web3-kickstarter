import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import LandingLayout from '../../../components/layouts/LandingLayout';
import CampaignDetailCard from '../../../components/ui/campaign/CampaignDetailCard';
import { Grid, GridItem } from '@chakra-ui/react';
import NewCampaignForm from '../../../components/ui/campaign/NewCampaignForm';

const ShowCampaign = ({
  balance,
  manager,
  minimumContribution,
  requestsCount,
  approversCount,
}) => {
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowX: 'scroll' },
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver',
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers',
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign',
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend.',
    },
  ];

  return (
    <LandingLayout>
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(6, 1fr)'
        gap={4}
      >
        {items.map((item, index) => (
          <GridItem colSpan={3} key={index}>
            <CampaignDetailCard feature={item} />
          </GridItem>
        ))}
        <GridItem rowSpan={2} colSpan={6}>
          <NewCampaignForm />
        </GridItem>
      </Grid>
    </LandingLayout>
  );
};

export default ShowCampaign;

export async function getServerSideProps(context) {
  const { address } = context.params;
  const campaign = Campaign(address);

  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}
