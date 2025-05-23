import { type FC, type ReactNode } from 'react'

type ExternalLinkProps = {
  children: ReactNode
  href: string
  target?: string
}

const ExternalLink: FC<ExternalLinkProps> = ({ children, href, target = '_blank' }) => {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      data-testid="link"
    >
      {children}
    </a>
  )
}

export default ExternalLink