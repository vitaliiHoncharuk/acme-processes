import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationContext';
import Notification from '../Notification';

const Wrapper = ({ action }: { action: string }) => {
  const { triggerNotification } = useNotification();
  return (
    <div>
      <button onClick={() => triggerNotification(action)}>Trigger</button>
      <Notification />
    </div>
  );
};

describe('Notifications', () => {
  it('should show notification and hides after timeout', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <Wrapper action="addItem" />
      </NotificationProvider>,
    );
    fireEvent.click(getByText('Trigger'));

    await waitFor(() =>
      expect(getByText('Activity added successfully')).toBeInTheDocument(),
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 3500));
    });

    expect(queryByText('Activity added successfully')).not.toBeInTheDocument();
  });
  it('should not trigger action', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const { getByText } = render(
      <NotificationProvider>
        <Wrapper action="badAction" />
      </NotificationProvider>,
    );
    fireEvent.click(getByText('Trigger'));

    expect(consoleError).toHaveBeenCalledWith(
      'No message defined for action: badAction',
    );
    consoleError.mockRestore();
  });
});
