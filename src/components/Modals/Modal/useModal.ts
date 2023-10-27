import { useState, useCallback } from 'react';

interface UseModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
  closeOnConfirm?: boolean;
}

const useModal = ({ onClose, onConfirm }: UseModalProps = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    onClose?.();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    onConfirm?.();
    setIsModalOpen(false);
  }, [onConfirm]);

  return {
    isModalOpen,
    handleOpen,
    handleClose,
    handleConfirm,
  };
};

export default useModal;
