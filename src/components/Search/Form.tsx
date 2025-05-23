import { useCallback, useContext, useEffect, useState, type FC } from 'react'
import { SearchContext } from '../../context/SearchContext'

type SearchFormProps = {
  disableForm: boolean
  onSubmit: Function
}

const Form: FC<SearchFormProps> = ({ disableForm, onSubmit }) => {
  const [filterPopular, setFilterPopular] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const { searchTerm: savedSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    // Persist search keyword from previous query
    setSearchKeyword(savedSearchTerm);
  }, [])

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(searchKeyword, filterPopular);
  }, [searchKeyword, filterPopular])

  return (
    <>
      <h1>GitHub Search</h1>
      <form onSubmit={handleFormSubmit}>
        <fieldset disabled={disableForm}>
          <input
            type='text'
            placeholder='Enter keyword'
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
          <label>
            <input
              type='checkbox'
              checked={filterPopular}
              onChange={e => setFilterPopular(e.target.checked)}
            />
            Popular
          </label>

          <button type='submit' disabled={!searchKeyword}>Search</button>
        </fieldset>
      </form>
    </>
  )
}

export default Form