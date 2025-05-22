import './App.css'
import { useState, useCallback } from 'react'
import type { Repository } from './types/repository'
import { fetchRepos } from './api'
import Loader from './components/Loader'

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filterPopular, setFilterPopular] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  const searchRepos = useCallback(async (searchKeyword: string, filterPopular: boolean) => {
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    searchRepos(searchKeyword, filterPopular);
  }, [searchKeyword, filterPopular])

  return (
    <>
      <h1>GitHub Search</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <label>
            <input
              type='checkbox'
              checked={filterPopular}
              onChange={e => setFilterPopular(e.target.checked)}
            />
            Popular
          </label>
          <input
            type='text'
            placeholder='Enter keyword'
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
          <button type='submit' disabled={!searchKeyword}>Search</button>
        </fieldset>
      </form>

      {isLoading ? (
        <Loader />
      ) : <>
        {
          repositories.length ? (
            <>
              <h2>Results:</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Private</th>
                  </tr>
                </thead>
                <tbody>
                  {repositories.map(repo => (
                    <tr key={repo.id}>
                      <td>{repo.name}</td>
                      <td>{repo.isPrivate ? '✅' : '❌'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>Enter a keyword to search GitHub.</p>
          )
        }
      </>}
    </>
  )
}

export default App
