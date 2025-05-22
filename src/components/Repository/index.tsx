import type { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Repository: FC = () => {
  const { name, owner } = useParams<{ owner: string, name: string }>()
  const navigate = useNavigate()

  if (!name || !owner) {
    navigate('/')
  }

  return (
    <></>
  )
}

export default Repository