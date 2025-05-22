import './App.css'
import { useState, useCallback } from 'react'
import type { Repository } from './types/repository'
import { fetchRepos } from './api'
import Loader from './components/Loader'
import SearchForm from './components/Search/Form'

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

      {!hasSearched ? (
        <p>Enter a keyword to search GitHub.</p>
      ) : <>
        {isLoading ? (
          <Loader />
        ) :
          repositories.length ? (
            <>
              <h2>Results:</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Public</th>
                  </tr>
                </thead>
                <tbody>
                  {repositories.map(repo => (
                    <tr key={repo.id}>
                      <td>{repo.name}</td>
                      <td>{repo.isPrivate ? '❌' : '✅'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No repositories found.</p>
          )
        }
      </>}
    </>
  )
}

export default App
