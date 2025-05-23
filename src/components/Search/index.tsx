import { useContext, type FC } from 'react'
import Loader from '../Loader'
import SearchForm from './Form'
import SearchResults from './Results'
import { SearchContext } from '../../context/SearchContext'

const Search: FC = () => {
  const { handleSearch, hasSearched, isLoading, repositories } = useContext(SearchContext);

  return (
    <main id="search">
      <SearchForm disableForm={isLoading} onSubmit={handleSearch} />

      {!hasSearched && <p>Enter a keyword to search GitHub.</p>}

      {hasSearched && (
        isLoading ? (
          <Loader />
        ) : (
          <SearchResults items={repositories} />
        )
      )}
    </main>
  )
}

export default Search
