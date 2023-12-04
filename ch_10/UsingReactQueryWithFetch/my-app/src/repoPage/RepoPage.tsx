import { useState } from 'react';
import { RepoData, SearchCriteria } from '../api/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepo } from '../api/getRepo';
import { starRepo } from '../api/starRepo';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StartRepoButton';

export function RepoPage() {
  const [seachCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  const { data } = useQuery({
    queryKey: ['repo', seachCriteria],
    queryFn: () => getRepo(seachCriteria as SearchCriteria),
    enabled: seachCriteria !== undefined,
  });

  const quetyClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: starRepo,
    onSuccess: () => {
      quetyClient.setQueryData<RepoData>(['repo', seachCriteria], (repo) => {
        if (repo === undefined) {
          return undefined;
        }
        return {
          ...repo,
          viewerHasStarred: true,
        };
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      mutate(data.repository.id);
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
