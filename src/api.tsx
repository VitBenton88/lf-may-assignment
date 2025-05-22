import type { Repository } from './types/repository'

export const fetchRepos = async (isPopular = false): Promise<Repository[]> => {
  const response = await fetch(isPopular ? '' : '')
  const repos = await response.json()

  return repos.map((repo: { id: string; name: string; private: boolean }) => ({
    id: repo.id,
    name: repo.name,
    isPrivate: repo.private,
  }))
}