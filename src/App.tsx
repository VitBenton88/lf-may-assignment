import './App.css'
import { useState, useCallback } from 'react'
import type { Repository } from './types/repository'
import { fetchRepos } from './api'
import Loader from './components/Loader'
import SearchForm from './components/Search/Form'
import SearchResults from './components/Search/Results'

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      <SearchForm onSubmit={handleFormSubmit} disableForm={isLoading} />

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

export default App
