import { createContext, useCallback, useState, type ReactNode } from 'react'
import type { BasicRepository } from '../types/repository'
import { searchRepositories } from '../api'

type SearchContextType = {
  repositories: BasicRepository[]
  handleSearch: Function
  hasSearched: boolean
  isLoading: boolean
}

const defaultValue: SearchContextType = {
  repositories: [],
  handleSearch: () => { },
  hasSearched: false,
  isLoading: false,
}

const SearchContext = createContext<SearchContextType>(defaultValue)

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [repositories, setRepositories] = useState<BasicRepository[]>([])

  const handleSearch = useCallback(async (searchKeyword: string, filterPopular: boolean) => {
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
    <SearchContext.Provider value={
      {
        handleSearch,
        hasSearched,
        isLoading,
        repositories,
      }
    }>
      {children}
    </SearchContext.Provider>
  )
}

export { SearchProvider, SearchContext };
