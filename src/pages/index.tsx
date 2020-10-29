import { Button } from 'antd';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button type="primary" onClick={() => window.alert('This is Home!')}>
        Button
      </Button>
    </div>
  );
};

export default Home;
