import { useCallback, useState, type FC } from 'react'
import type { BasicRepository } from '../../types/repository'
import { searchRepositories } from '../../api'
import Loader from '../Loader'
import SearchForm from './Form'
import SearchResults from './Results'

const Search: FC = () => {
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [repositories, setRepositories] = useState<BasicRepository[]>([])

  const handleFormSubmit = useCallback(async (searchKeyword: string, filterPopular: boolean) => {
    setHasSearched(true);
    setIsLoading(true);
    setRepositories([]);

    try {
      const reposFetch = await searchRepositories(searchKeyword, filterPopular);
      setRepositories(reposFetch);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      }
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
