import type { FC } from 'react'
import type { Repository } from '../../types/repository'

type SearchResultsProps = {
  items: Repository[]
}

const Results: FC<SearchResultsProps> = ({ items }) => {
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
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.isPrivate ? '❌' : '✅'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Results