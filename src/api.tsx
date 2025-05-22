import type { Repository } from './types/repository'

export const fetchRepos = async (searchKeyword = '', searchPopular = false): Promise<Repository[]> => {
  let fetchUrl = `https://api.github.com/search/repositories?q=${searchKeyword}`;

  if (searchPopular) {
    fetchUrl += '+stars:>1000'
  }

  const response = await fetch(fetchUrl)
  const repos = await response.json()

  return repos.map((repo: { id: string; name: string; private: boolean }) => ({
    id: repo.id,
    name: repo.name,
    isPrivate: repo.private,
  }))
}