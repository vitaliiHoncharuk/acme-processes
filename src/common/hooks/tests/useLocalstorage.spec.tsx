import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import useLocalStorage from '../useLocalStorage';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const LocalStorageComponent = ({
  storageKey,
  initialValue,
}: {
  storageKey: string;
  initialValue: string;
}) => {
  const [storedValue, setStoredValue] = useLocalStorage(
    storageKey,
    initialValue,
  );
  return (
    <div>
      <span data-testid="storedValue">{storedValue}</span>
      <button onClick={() => setStoredValue('newValue')}>Update Value</button>
      <button
        onClick={() =>
          window.localStorage.setItem(
            storageKey,
            JSON.stringify('externalValue'),
          )
        }
      >
        External Update
      </button>
    </div>
  );
};

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct value', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify('mockValue'));
    const { getByTestId } = render(
      <LocalStorageComponent
        storageKey="testKey"
        initialValue="initialValue"
      />,
    );
    expect(getByTestId('storedValue').textContent).toBe('mockValue');
  });

  it('should fall back to initial value if localStorage is empty', () => {
    const { getByTestId } = render(
      <LocalStorageComponent
        storageKey="testKey"
        initialValue="initialValue"
      />,
    );
    expect(getByTestId('storedValue').textContent).toBe('initialValue');
  });

  it('should update localStorage when the value is updated', () => {
    const { getByText } = render(
      <LocalStorageComponent
        storageKey="testKey"
        initialValue="initialValue"
      />,
    );
    act(() => {
      fireEvent.click(getByText('Update Value'));
    });
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify('newValue'),
    );
  });
});
