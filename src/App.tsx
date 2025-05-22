import './App.css'
import { useState } from 'react'
import type { Repository } from './types/repository'

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filterPopular, setFilterPopular] = useState(false)

  return (
    <>
    </>
  )
}

export default App
