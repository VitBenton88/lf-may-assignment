import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect } from 'vitest'
import ExternalLink from '../ExternalLink'

describe('ExternalLink', () => {
  const mockHref = 'https://test.com';
  const mockTarget = '_self';

  const elements = {
    get link() { return screen.getByTestId('link'); },
  };

  describe('render', () => {
    describe('with href prop', () => {
      beforeEach(() => {
        render(<ExternalLink href={mockHref}><span>Click me</span></ExternalLink>)
      })

      it('renders an anchor element with the correct href value', () => {
        const { link } = elements;
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', mockHref)
      })
    })

    describe('with target prop', () => {
      beforeEach(() => {
        render(<ExternalLink href={mockHref} target={mockTarget}><span>Click me</span></ExternalLink>)
      })

      it('renders an anchor element with the correct target value', () => {
        const { link } = elements;
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('target', mockTarget)
      })
    })
  })
})