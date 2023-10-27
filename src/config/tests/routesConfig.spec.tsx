import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoutesConfig from '../routesConfig';

jest.mock('../../Pages/ProtectedRoute/ProtectedRoute', () => () => (
  <div>ProtectedRoute</div>
));
jest.mock('../../Pages/Editor/Editor', () => () => <div>Editor</div>);
jest.mock('../../Pages/NotFound/NotFound', () => () => <div>NotFound</div>);
jest.mock('../../Pages/Login/Login', () => () => <div>Login</div>);

describe('<RoutesConfig />', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <RoutesConfig />
      </MemoryRouter>,
    );
  });

  it('renders Login component at /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <RoutesConfig />
      </MemoryRouter>,
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders ProtectedRoute component at /editor', () => {
    render(
      <MemoryRouter initialEntries={['/editor']}>
        <RoutesConfig />
      </MemoryRouter>,
    );
    expect(screen.getByText('ProtectedRoute')).toBeInTheDocument();
  });

  it('renders NotFound component at non-existing route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existing-route']}>
        <RoutesConfig />
      </MemoryRouter>,
    );
    expect(screen.getByText('NotFound')).toBeInTheDocument();
  });
});
