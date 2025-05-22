import './App.css'
import { useState } from 'react'
import type { Repository } from './types/repository'
import { fetchRepos } from './api'

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filterPopular, setFilterPopular] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  const searchRepos = async () => {
    try {
      const reposFetch = await fetchRepos(searchKeyword, filterPopular);
      setRepositories(reposFetch);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchRepos();
  }

  return (
    <>
      <h1>GitHub Search</h1>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Search</button>
      </form>

      {repositories.length ? (
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
      )}
    </>
  )
}

export default App
