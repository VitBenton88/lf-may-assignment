import './App.css'
import { useState } from 'react'
import type { Repository } from './types/repository'
import { fetchRepos } from './api'

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filterPopular, setFilterPopular] = useState(false)

  const searchRepos = async () => {
    try {
      const reposFetch = await fetchRepos(filterPopular);
      setRepositories(reposFetch);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {repositories.length ? (
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
      ) : (
        <p>Enter a keyword to search GitHub.</p>
      )}
    </>
  )
}

export default App
