import LandingLayout from '../../../../components/layouts/LandingLayout';
import RequestForm from '../../../../components/ui/campaign/request/RequestForm';

const NewCampaignRequest = ({ address }) => {
  return (
    <LandingLayout>
      <RequestForm address={address} />
    </LandingLayout>
  );
};

export default NewCampaignRequest;

export async function getServerSideProps(context) {
  const { address } = context.params;

  return {
    props: {
      address,
    },
  };
}
