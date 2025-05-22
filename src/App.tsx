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
    </>
  )
}

export default App
