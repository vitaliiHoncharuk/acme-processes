import { styled } from '@mui/system';
import { Grid } from '@mui/material';

export const EditorWrapper = styled('div')`
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
`;

export const MenuContainer = styled(Grid)`
  background-color: #20232a;
  border-right: 1px solid #ddd;
`;

export const CanvasContainer = styled(Grid)`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .canvas-widget {
    flex-grow: 1;
  }
`;

export const ZoomControls = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '3px',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));
