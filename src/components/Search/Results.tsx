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
          {items.map(({ id, isPrivate, name, owner }) => (
            <tr key={id} onClick={() => handleClick(owner, name)}>
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