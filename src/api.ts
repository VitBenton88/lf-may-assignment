import type { Repository } from './types/repository'

export const fetchRepos = async (searchKeyword = '', popularFilter = false): Promise<Repository[]> => {
  let fetchUrl = `https://api.github.com/search/repositories?q=${searchKeyword}`;

  if (popularFilter) {
    fetchUrl += '+stars:>1000'
  }

  const response = await fetch(fetchUrl);

  if (response.ok) {
    const { items } = await response.json();

    return items.map((repo: { id: string; name: string; private: boolean }) => ({
      id: repo.id,
      name: repo.name,
      isPrivate: repo.private,
    }))
  }

  return [];
}