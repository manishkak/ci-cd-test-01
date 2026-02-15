import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders app heading', () => {
  render(<App />)
  const heading = screen.getByText(/User Authentication System/i)
  expect(heading).toBeInTheDocument()
})
