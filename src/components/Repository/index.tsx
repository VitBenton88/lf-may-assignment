import { useCallback, useEffect, useState, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepository } from '../../api'
import type { Repository } from '../../types/repository'
import Loader from '../Loader'
import ExternalLink from '../ExternalLink'

const Repository: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [repository, setRepository] = useState<Repository | null>(null)
  const { name, owner } = useParams<{ owner: string, name: string }>()
  const navigate = useNavigate()

  if (!name || !owner) {
    navigate('/')
  }

  const formatDisplayDate = useCallback((isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString();
  }, [])

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const fetchedRepository = await getRepository(owner, name);
        setRepository(fetchedRepository);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          alert(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepository();
  }, [owner, name])

  if (isLoading) return (<Loader />)
  if (!repository?.id) return (<p>Repository not found.</p>)

  return (
    <main id="repository">
      <header>
        <h1>{repository.name}</h1>
        {!!repository.description &&
          (<h2>{repository.description}</h2>)
        }
        <h3>Owner: {repository.owner}</h3>
        <h4>Created: {formatDisplayDate(repository.created_at)}</h4>
      </header>

      <aside>
        <section>
          <header>
            <h4>Access:</h4>
          </header>
          <ul>
            <li>{repository.archived ? 'Archived' : 'Not archived'}</li>
            <li>{repository.isPrivate ? 'Private' : 'Public'}</li>
          </ul>
        </section>

        <section>
          <header>
            <h4>Links:</h4>
          </header>
          <ul>
            {!!repository.homepage &&
              (<li>
                <ExternalLink href={repository.homepage}>Homepage &rarr;</ExternalLink>
              </li>)
            }
            <li>
              <ExternalLink href={repository.html_url}>GitHub &rarr;</ExternalLink>
            </li>
          </ul>
        </section>
      </aside>
    </main>
  )
}

export default Repository