import React from 'react';
import { useRouter } from 'next/router';

import Layout from '../../src/components/Layout/Layout';
import Speaker from '../../src/components/Speaker/Speaker';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div />;
  }

  return (
    <Layout>
      <Speaker id={id} />
    </Layout>
  );
};

export default Page;
