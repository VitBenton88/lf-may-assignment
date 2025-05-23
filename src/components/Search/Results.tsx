import { useCallback, type FC } from 'react'
import type { BasicRepository } from '../../types/repository'
import { useNavigate } from 'react-router-dom'

type SearchResultsProps = {
  items: BasicRepository[]
}

const Results: FC<SearchResultsProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(async (owner: string, name: string) => {
    navigate(`/repo/${owner}/${name}`);
  }, [])

  const formatDisplayDate = useCallback((isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString();
  }, [])

  if (!items.length) return (<p>No repositories found.</p>);

  return (
    <>
      <h2>Results:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ created_at, id, name, owner }) => (
            <tr key={id} onClick={() => handleClick(owner, name)}>
              <td>{name}</td>
              <td>{formatDisplayDate(created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Results