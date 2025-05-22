import { useCallback, type FC } from 'react'
import type { Repository } from '../../types/repository'
import { useNavigate } from 'react-router-dom'

type SearchResultsProps = {
  items: Repository[]
}

const Results: FC<SearchResultsProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(async (id: string) => {
    navigate(`/repo/${id}`);
  }, [])

  if (!items.length) (<p>No repositories found.</p>);

  return (
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
          {items.map(({ id, name, isPrivate }) => (
            <tr key={id} onClick={() => handleClick(id)}>
              <td>{name}</td>
              <td>{isPrivate ? '❌' : '✅'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Results