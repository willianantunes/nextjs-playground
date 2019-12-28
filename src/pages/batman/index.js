import Layout from '../../components/MyLayout';
import Link from 'next/link';
import * as tvmazeService from '../../services/TVMazeService';

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href='/batman/details/[id]' as={`/batman/details/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async () => {
  const data = await tvmazeService.showSearch('batman');

  return {
    shows: data.map(entry => entry.show),
  };
};

export default Index;
