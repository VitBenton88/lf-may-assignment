import * as api from '../../../api.js'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi, type Mock } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Repository from '../index'
import userEvent from '@testing-library/user-event'

const mockNavigate = vi.fn()

const mockRepo = {
  id: 1,
  name: 'mock-repo',
  stargazers_count: 42,
  description: 'A test repo',
  owner: 'mock-owner',
  owner_url: 'https://github.com/mock-owner',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  language: 'TypeScript',
  size: 1234,
  has_downloads: true,
  allow_forking: false,
  archived: false,
  isPrivate: false,
  homepage: 'https://example.com',
  html_url: 'https://github.com/mock-owner/mock-repo'
}

vi.mock('../../../api.js', async () => {
  const actual = await vi.importActual('../../../api.js')
  return {
    ...actual,
    getRepository: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({
      name: mockRepo.name,
      owner: mockRepo.owner
    })
  };
});

describe('Repository', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={['/repo/mock-owner/mock-repo']}>
        <Repository />
      </MemoryRouter>
    );

  const elements = {
    get backBtn() { return screen.getByTestId('back-btn'); },
    get description() { return screen.queryByTestId('description'); },
    get downloads() { return screen.queryByTestId('downloads'); },
    get nav() { return screen.queryByTestId('nav'); },
    get notFoundWarning() { return screen.queryByTestId('not-found'); },
    get title() { return screen.queryByTestId('title'); },
  };

  describe('render', () => {
    describe('default', () => {
      beforeEach(() => {
        (api.getRepository as Mock).mockResolvedValue(mockRepo);
        renderComponent();
      })

      it('should render navigation', async () => {
        await waitFor(() => {
          expect(elements.nav).toBeInTheDocument()
        })
      })

      it('should render correct repository data', async () => {
        await waitFor(() => {
          const { description, downloads, notFoundWarning, title } = elements;

          expect(notFoundWarning).not.toBeInTheDocument()
          expect(description).toBeInTheDocument()
          expect(description).toHaveTextContent(mockRepo.description)
          expect(downloads).toHaveTextContent('Has downloads')
          expect(title).toHaveTextContent(mockRepo.name)
        })
      })

      it('should fetch repository on render', async () => {
        await waitFor(() => {
          expect(api.getRepository).toHaveBeenCalledWith(mockRepo.owner, mockRepo.name)
        })
      })
    });

    describe('when no repository is found', () => {
      beforeEach(() => {
        vi.mock('../../../api.js', () => ({ getRepository: vi.fn() }));
        (api.getRepository as Mock).mockResolvedValue(null);
        renderComponent();
      })

      it('should only render warning', async () => {
        await waitFor(() => {
          const { notFoundWarning, title } = elements;

          expect(notFoundWarning).toBeInTheDocument()
          expect(title).not.toBeInTheDocument()
        })
      })
    })
  });

  describe('behavior', () => {
    describe('when clicking back button', () => {
      beforeEach(async () => {
        (api.getRepository as Mock).mockResolvedValue(mockRepo);
        renderComponent();

        await waitFor(async () => {
          await userEvent.click(elements.backBtn);
        })
      })

      it('should navigate user to home route', async () => {
        await waitFor(() => {
          expect(mockNavigate).toHaveBeenCalledWith('/');
        })
      })
    });
  });
})