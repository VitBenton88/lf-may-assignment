export type BasicRepository = {
  created_at: string
  id: string
  name: string
  owner: string
}

export type Repository = {
  allow_forking: boolean
  archived: boolean
  created_at: string
  description: string
  has_downloads: boolean
  homepage: string
  html_url: string
  id: string
  isPrivate: boolean
  language: string
  name: string
  owner: string
  owner_url: string
  size: number
  stargazers_count: number
  updated_at: string
}