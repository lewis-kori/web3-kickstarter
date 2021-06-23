import { Badge } from '@chakra-ui/react';
import LandingLayout from '../components/layouts/LandingLayout';
import CampaignCard from '../components/ui/campaign/CampaignCard';
import factory from '../ethereum/factory';

const Campaigns = ({ campaigns }) => {
  return campaigns.length > 0 ? (
    campaigns.map((address, index) => (
      <CampaignCard address={address} key={index} />
    ))
  ) : (
    <Badge colorScheme='pink'>No campaigns to display</Badge>
  );
};

export default function Home({ campaigns }) {
  return (
    <LandingLayout>
      <Campaigns campaigns={campaigns} />
    </LandingLayout>
  );
}

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}
