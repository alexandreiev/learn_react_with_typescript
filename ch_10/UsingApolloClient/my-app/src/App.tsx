import './App.css';
import { Header } from './Header';
import { RepoPage } from './repoPage/RepoPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const queryClient = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_URL!,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PAT}`,
  },
});

function App() {
  return (
    <ApolloProvider client={queryClient}>
      <Header />
      <RepoPage />
    </ApolloProvider>
  );
}

export default App;
