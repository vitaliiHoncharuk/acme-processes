import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../common/AuthContext';
import ProtectedRoute from '../ProtectedRoute';

jest.mock('../../../common/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('<ProtectedRoute />', () => {
  it('renders without crashing', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Test Child</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
  });

  it('redirects to /login if user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Test Child</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
    expect(screen.queryByText('Test Child')).not.toBeInTheDocument();
  });

  it('renders children if user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: '123' } });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Test Child</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
