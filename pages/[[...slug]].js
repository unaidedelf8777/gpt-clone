import dynamic from 'next/dynamic';

const DynamicApp = dynamic(() => import('../src/app/components/App'), { ssr: false });

const CatchAllPage = () => {
  return <DynamicApp />;
};

export default CatchAllPage;