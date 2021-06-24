import Campaign from '../../../../ethereum/campaign';
import RequestTable from '../../../../components/ui/campaign/request/RequestTable';
import LandingLayout from '../../../../components/layouts/LandingLayout';

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
  return (
    <LandingLayout>
      <RequestTable requests={requests} approversCount={approversCount} />
    </LandingLayout>
  );
};

export default RequestIndex;

export async function getServerSideProps(context) {
  const { address } = context.params;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    props: {
      address,
      requests: JSON.parse(JSON.stringify(requests)),
      requestCount,
      approversCount,
    },
  };
}
