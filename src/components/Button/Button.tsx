import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  label: string;
  handleClick: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  label,
  handleClick,
  ...props
}) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={handleClick}
    fullWidth
    sx={(theme) => ({
      marginBottom: '16px',
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    })}
    {...props}
  >
    {label}
  </Button>
);

export default StyledButton;
