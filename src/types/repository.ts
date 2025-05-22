export type BasicRepository = {
  id: string
  isPrivate: boolean
  name: string
  owner: string
}

export type Repository = {
  archived: boolean
  created_at: string
  description: string
  homepage: string
  html_url: string
  id: string
  isPrivate: boolean
  name: string
}