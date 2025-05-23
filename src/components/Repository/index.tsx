import { useCallback, useEffect, useState, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepository } from '../../api'
import type { Repository as RepositoryType } from '../../types/repository'
import Loader from '../Loader'
import ExternalLink from '../ExternalLink'

const Repository: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [repository, setRepository] = useState<RepositoryType | null>(null)
  const { name, owner } = useParams<{ owner: string, name: string }>()
  const navigate = useNavigate()

  const formatDisplayDate = useCallback((isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString();
  }, [])

  const handleNavigateHome = useCallback(() => {
    navigate('/')
  }, [])

  if (!name || !owner) {
    handleNavigateHome()
  }

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
    <>
      <nav><button type='button' onClick={handleNavigateHome}>&larr; Back to search</button></nav>
      <main id="repository">
        <header>
          <h1>{repository.name}</h1>
          {!!repository.description &&
            (<h2>{repository.description}</h2>)
          }
          <h3>Owner: <ExternalLink href={repository.owner_url}>{repository.owner} &rarr;</ExternalLink></h3>
          <h4>Created: {formatDisplayDate(repository.created_at)}</h4>
          <h4>Updated: {formatDisplayDate(repository.updated_at)}</h4>
        </header>

        <aside>
          <section>
            <header>
              <h4>Details:</h4>
            </header>
            <ul>
              <li>Language: {repository.language}</li>
              <li>Size: {repository.size} bytes</li>
              <li>{repository.has_downloads ? 'Has downloads' : 'No downloads'}</li>
              <li>{repository.allow_forking ? 'Allows forking' : 'Does not allow forking'}</li>
            </ul>
          </section>

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
    </>
  )
}

export default Repository