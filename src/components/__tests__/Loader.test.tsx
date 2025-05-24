import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect } from 'vitest'
import Loader from '../Loader'

describe('Loader', () => {
  const elements = {
    get loader() { return screen.getByTestId('loader'); },
  };

  describe('render', () => {
    beforeEach(() => {
      render(<Loader />)
    })

    it('should render a loader element', () => {
      expect(elements.loader).toBeInTheDocument()
    })
  })
})