import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import GitHubRepos from '@/components/GitHubRepos'

vi.mock('@/lib/hooks', () => ({
  useScrollReveal: () => ({ current: null }),
}))

const mockFetch = vi.fn()

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function makeRepo(overrides: Record<string, unknown> = {}) {
  return {
    id: 1, name: 'test-repo', description: 'A test repo',
    html_url: 'https://github.com/test/test-repo',
    stargazers_count: 5, forks_count: 2, language: 'Python',
    topics: ['ai', 'ml'], updated_at: '2025-01-01', homepage: null,
    ...overrides,
  }
}

describe('GitHubRepos contract', () => {
  it('shows loading skeleton initially', () => {
    mockFetch.mockReturnValue(new Promise(() => {}))
    const { container } = render(<GitHubRepos />)
    // Loading state renders 3 skeleton divs with animate-pulse
    expect(container.querySelectorAll('.animate-pulse').length).toBe(3)
  })

  it('renders repos on success', async () => {
    mockFetch.mockResolvedValue({
      ok: true, json: () => Promise.resolve([makeRepo({ name: 'my-ai-project' })]),
    })
    render(<GitHubRepos />)
    await waitFor(() => expect(screen.getByText('my-ai-project')).toBeDefined())
  })

  it('filters out .github repos', async () => {
    mockFetch.mockResolvedValue({
      ok: true, json: () => Promise.resolve([
        makeRepo({ id: 1, name: 'real-repo' }),
        makeRepo({ id: 2, name: '.github' }),
      ]),
    })
    render(<GitHubRepos />)
    await waitFor(() => {
      expect(screen.getByText('real-repo')).toBeDefined()
      expect(screen.queryByText('.github')).toBeNull()
    })
  })

  it('shows fallback text when description is null', async () => {
    mockFetch.mockResolvedValue({
      ok: true, json: () => Promise.resolve([makeRepo({ description: null })]),
    })
    render(<GitHubRepos />)
    await waitFor(() => expect(screen.getByText('No description provided.')).toBeDefined())
  })

  it('shows error state on fetch failure', async () => {
    mockFetch.mockResolvedValue({ ok: false })
    render(<GitHubRepos />)
    await waitFor(() => expect(screen.getByText(/Could not fetch repos/)).toBeDefined())
  })

  it('shows error state on network error', async () => {
    mockFetch.mockRejectedValue(new Error('network'))
    render(<GitHubRepos />)
    await waitFor(() => expect(screen.getByText(/Could not fetch repos/)).toBeDefined())
  })

  it('shows empty state when no repos', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) })
    render(<GitHubRepos />)
    await waitFor(() => expect(screen.getByText(/No public repos yet/)).toBeDefined())
  })

  it('fetches correct GitHub endpoint', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) })
    render(<GitHubRepos />)
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/aheteshamkhan/repos?sort=updated&per_page=6',
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      )
    })
  })

  it('caps displayed topics at 4', async () => {
    mockFetch.mockResolvedValue({
      ok: true, json: () => Promise.resolve([
        makeRepo({ topics: ['a', 'b', 'c', 'd', 'e', 'f'] }),
      ]),
    })
    render(<GitHubRepos />)
    await waitFor(() => {
      expect(screen.getByText('a')).toBeDefined()
      expect(screen.getByText('d')).toBeDefined()
      expect(screen.queryByText('e')).toBeNull()
    })
  })
})
