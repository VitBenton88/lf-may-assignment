import type { BasicRepository, Repository } from './types/repository'

const BASE_URL = 'https://api.github.com';

export const searchRepositories = async (searchKeyword = '', popularFilter = false): Promise<BasicRepository[]> => {
  let fetchUrl = `${BASE_URL}/search/repositories?q=${searchKeyword}`;

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

export const getRepository = async (owner = '', name = ''): Promise<Repository | null> => {
  let fetchUrl = `${BASE_URL}/repos/${owner}/${name}`;

  const response = await fetch(fetchUrl);

  if (response.ok) {
    const { archived, created_at, description, homepage, html_url, id, private: isPrivate, name } = await response.json();

    return {
      archived,
      created_at,
      description,
      homepage,
      html_url,
      id,
      isPrivate,
      name
    }
  }

  return null;
}