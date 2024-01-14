import { useState } from 'react';
import { RepoData, SearchCriteria } from '../api/types';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StartRepoButton';
import { GET_REPO } from '../api/getRepo';
import { useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { STAR_REPO } from '../api/starRepo';

export function RepoPage() {
  const [seachCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  const [getRepo, { data }] = useLazyQuery(GET_REPO);

  const quetyClient = useApolloClient();
  const [starRepo] = useMutation(STAR_REPO, {
    onCompleted: () => {
      quetyClient.cache.writeQuery({
        query: GET_REPO,
        data: {
          repository: {
            ...data.repository,
            viewerHasStarred: true,
          },
        },
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    getRepo({
      variables: { ...search },
    });
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      starRepo({ variables: { repoId: data.repository.id } });
    }
  }

  return (
    <main className="max-w-xs ml-auto mr-auto">
      <SearchRepoForm onSearch={handleSearch} />
      {data && (
        <>
          <FoundRepo
            name={data.repository.name}
            description={data.repository.description}
            stars={data.repository.stargazers.totalCount}
          />
          {!data.repository.viewerHasStarred && <StarRepoButton onClick={handleStarClick} />}
        </>
      )}
    </main>
  );
}
