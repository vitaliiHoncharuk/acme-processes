import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../NotFound';

describe('<NotFoundPage />', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
  });

  it('displays the 404 error message and a Go Home button', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('navigates to the home page when the Go Home button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('Go Home'));
    expect(screen.getByText('Go Home').closest('a')).toHaveAttribute(
      'href',
      '/',
    );
  });
});
