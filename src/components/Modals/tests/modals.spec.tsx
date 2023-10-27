import React from 'react';
import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from '@testing-library/react';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';

describe('Modal', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  it('should render without crashing', () => {
    render(
      <Modal
        open={true}
        title="Test Modal"
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      >
        <div>Test Content</div>
      </Modal>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should call onClose and onConfirm when respective buttons are clicked', () => {
    render(
      <Modal
        open={true}
        title="Test Modal"
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      >
        <div>Test Content</div>
      </Modal>,
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('should hide actions when disableActions is true', () => {
    render(
      <Modal
        open={true}
        title="Test Modal"
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        disableActions={true}
      >
        <div>Test Content</div>
      </Modal>,
    );
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
  });

  describe('useModal', () => {
    it('should handle opening, closing, and confirming the modal', () => {
      const onCloseMock = jest.fn();
      const onConfirmMock = jest.fn();
      const { result } = renderHook(() =>
        useModal({ onClose: onCloseMock, onConfirm: onConfirmMock }),
      );

      expect(result.current.isModalOpen).toBe(false);

      act(() => {
        result.current.handleOpen();
      });
      expect(result.current.isModalOpen).toBe(true);

      act(() => {
        result.current.handleClose();
      });
      expect(result.current.isModalOpen).toBe(false);
      expect(onCloseMock).toHaveBeenCalled();

      act(() => {
        result.current.handleOpen();
      });
      act(() => {
        result.current.handleConfirm();
      });
      expect(result.current.isModalOpen).toBe(false);
      expect(onConfirmMock).toHaveBeenCalled();
    });
  });
});
