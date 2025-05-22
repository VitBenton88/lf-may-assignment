import type { BasicRepository } from './types/repository'

export const searchRepositories = async (searchKeyword = '', popularFilter = false): Promise<BasicRepository[]> => {
  let fetchUrl = `https://api.github.com/search/repositories?q=${searchKeyword}`;

  if (popularFilter) {
    fetchUrl += '+stars:>1000'
  }

  const response = await fetch(fetchUrl);

  if (response.ok) {
    const { items } = await response.json();

    return items.map((repo: { id: string; name: string; owner: { login: string }; private: boolean }) => ({
      id: repo.id,
      isPrivate: repo.private,
      name: repo.name,
      owner: repo.owner.login,
    }))
  }

  return [];
}