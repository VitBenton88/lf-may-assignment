import './App.css'
import { Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import Repository from './components/Repository'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Search />} />
      <Route path='/repo/:owner/:name' element={<Repository />} />
    </Routes>
  )
}

export default App
