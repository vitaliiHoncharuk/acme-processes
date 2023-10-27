import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react'; // Import act from @testing-library/react
import { MemoryRouter } from 'react-router-dom';
import { NotificationProvider } from '../../../components/Notification/NotificationContext';
import Login from '../Login';
import { AuthProvider } from '../../../common/auth/AuthContext';
import userEvent from '@testing-library/user-event';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<Login />', () => {
  beforeEach(() => {
    act(() => {
      render(
        <MemoryRouter>
          <NotificationProvider>
            <AuthProvider>
              <Login />
            </AuthProvider>
          </NotificationProvider>
        </MemoryRouter>,
      );
    });
  });

  it('renders without crashing', () => {
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('updates username and password fields', () => {
    act(() => {
      fireEvent.change(screen.getByLabelText('Username'), {
        target: { value: 'admin' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'admin' },
      });
    });
    expect(screen.getByLabelText('Username')).toHaveValue('admin');
    expect(screen.getByLabelText('Password')).toHaveValue('admin');
  });

  it('redirects to /editor on successful login', async () => {
    await act(async () => {
      userEvent.type(screen.getByLabelText(/username/i), 'admin');
      userEvent.type(screen.getByLabelText(/password/i), 'admin');
      userEvent.click(screen.getByTestId('login-button'));
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/editor'),
    );
  });
});
