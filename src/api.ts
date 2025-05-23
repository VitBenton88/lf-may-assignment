import type { BasicRepository, Repository } from './types/repository'

const BASE_URL = 'https://api.github.com';

/**
 * Search repositories.
 * @param {string} searchKeyword - Keyword for search query.
 * @param {boolean} popularFilter - Filter search query for popular repositories (>1k stars).
 * @returns {BasicRepository[]}
 */
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
  } else {
    throw new Error(`Failed to search repositories. ${response.status} ${response.statusText}`);
  }
}

/**
 * Get an individual repository's data.
 * @param {string} owner - Name of repository's owner.
 * @param {string} name - Repository's name.
 * @returns {Repository}
 */
export const getRepository = async (owner = '', name = ''): Promise<Repository> => {
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
  } else {
    throw new Error(`Failed to fetch repository. ${response.status} ${response.statusText}`);
  }
}