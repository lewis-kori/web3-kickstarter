import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import LandingLayout from '../../components/layouts/LandingLayout';

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
      style: { overflowWrap: 'break-word' },
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
    <LandingLayout>{web3.utils.fromWei(balance, 'ether')} eth</LandingLayout>
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
