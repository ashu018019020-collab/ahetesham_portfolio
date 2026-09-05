'use client'

import { useEffect, useState } from 'react'
import { useScrollReveal } from '@/lib/hooks'
import { ExternalLink, Star, GitFork, Code2 } from 'lucide-react'
import { GithubIcon } from './Icons'

interface Repo {
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

const GITHUB_USERNAME = 'aheteshamkhan'

const languageColors: Record<string, string> = {
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

export default function GitHubRepos() {
  const ref = useScrollReveal(80)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        )
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setRepos(data.filter((r: Repo) => !r.name.includes('.github')))
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card animate-pulse rounded-2xl p-6">
            <div className="h-4 w-3/4 rounded bg-white/5" />
            <div className="mt-3 h-3 w-full rounded bg-white/5" />
            <div className="mt-2 h-3 w-2/3 rounded bg-white/5" />
          </div>
        ))}
      </div>
    )
  }

  if (error || repos.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <GithubIcon size={32} className="mx-auto text-body-light" />
        <p className="mt-3 text-sm text-body-light">
          {error ? 'Could not fetch repos. Check back later!' : 'No public repos yet — stay tuned!'}
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary"
        >
          Visit GitHub Profile <ExternalLink size={14} />
        </a>
      </div>
    )
  }

  return (
    <div ref={ref} className="reveal">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card card-hover group flex flex-col rounded-2xl p-5"
          >
            {/* Repo name */}
            <div className="flex items-center gap-2">
              <Code2 size={16} className="shrink-0 text-primary" />
              <h3 className="truncate font-display text-sm font-semibold text-heading">
                {repo.name}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-2 flex-1 text-xs text-body-light leading-relaxed line-clamp-2">
              {repo.description || 'No description provided.'}
            </p>

            {/* Language + Stats */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1.5 text-xs text-body-light">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: languageColors[repo.language] || '#6e7681' }}
                    />
                    {repo.language}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-body-light">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-accent-amber" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} />
                  {repo.forks_count}
                </span>
              </div>
            </div>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {repo.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-primary/8 px-2 py-0.5 text-[10px] font-medium text-primary-light"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-6 text-center">
        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-primary-light transition-all hover:text-primary hover:gap-3"
        >
          View All Repositories
          <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}
