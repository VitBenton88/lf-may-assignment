import { useCallback, useState, type FC } from 'react'
import type { Repository } from '../../types/repository'
import { fetchRepos } from '../../api'
import Loader from '../Loader'
import SearchForm from './Form'
import SearchResults from './Results'

const Search: FC = () => {
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])

  const handleFormSubmit = useCallback(async (searchKeyword: string, filterPopular: boolean) => {
    setHasSearched(true);
    setIsLoading(true);
    setRepositories([]);

    try {
      const reposFetch = await fetchRepos(searchKeyword, filterPopular);
      setRepositories(reposFetch);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  return (
    <>
      <SearchForm disableForm={isLoading} onSubmit={handleFormSubmit} />

      {!hasSearched && <p>Enter a keyword to search GitHub.</p>}

      {hasSearched && (
        isLoading ? (
          <Loader />
        ) : (
          <SearchResults items={repositories} />
        )
      )}
    </>
  )
}

export default Search
