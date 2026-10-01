// Integration layer: everything that talks to GitHub lives here, not in components.

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  homepage: string | null
}

export const GITHUB_USERNAME = 'aheteshamkhan'

const REPOS_PER_PAGE = 6

export const GITHUB_API_ACCEPT = 'application/vnd.github.v3+json'

/** GitHub's language colours, for the little dot next to each repo's language. */
export const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  JupyterNotebook: '#DA5B0B',
  Markdown: '#083fa1',
}

/** Most recently updated public repos, minus the profile `.github` repo. Throws on failure. */
export async function fetchRepos(
  username: string = GITHUB_USERNAME
): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${REPOS_PER_PAGE}`,
    { headers: { Accept: GITHUB_API_ACCEPT } }
  )
  if (!res.ok) throw new Error(`GitHub returned ${res.status}`)

  const repos = (await res.json()) as Repo[]
  return repos.filter((repo) => !repo.name.includes('.github'))
}
