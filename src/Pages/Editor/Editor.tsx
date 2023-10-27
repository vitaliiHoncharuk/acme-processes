import React, { useMemo } from 'react';
import { Grid, IconButton } from '@mui/material';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import useDiagram from './hooks/useDiagram';
import useModal from '../../components/Modals/Modal/useModal';
import AddActivityModal from '../../components/Modals/AddActivityModal/AddActivityModal';
import { useDiagramActions } from './hooks/useDiagramActions';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import {
  EditorWrapper,
  MenuContainer,
  CanvasContainer,
  ZoomControls,
} from './editor.styles';
import StyledButton from '../../components/Button/Button';
import ActionsSpeedDial, {
  SpeedDialAction,
} from '../../components/ActionsSpeedDial/ActionsSpeedDial';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../common/auth/AuthContext';

const Editor: React.FC = () => {
  const { logout } = useAuth();
  const { isModalOpen, handleOpen, handleClose } = useModal();
  const { engine, model } = useDiagram();
  const {
    addNode,
    clearNodes,
    deleteSelectedNodes,
    cloneSelected,
    lockModel,
    unlockModel,
  } = useDiagramActions(engine, model);

  const handleAddActivity = (
    activityName: string,
    color: string,
    selectedActivity: string,
  ) => {
    addNode(activityName, color, selectedActivity);
  };

  const actions: SpeedDialAction[] = useMemo(
    () => [
      { icon: <AddIcon />, name: 'Add Activity', onClick: handleOpen },
      {
        icon: <DeleteIcon />,
        name: 'Delete Selected',
        onClick: deleteSelectedNodes,
      },
    ],
    [deleteSelectedNodes, handleOpen],
  );

  return (
    <EditorWrapper>
      <Grid container spacing={0} direction="row">
        <MenuContainer item sm={3} padding="10px">
          <StyledButton label="Clear Board" handleClick={clearNodes} />
          <StyledButton label="Clone selected" handleClick={cloneSelected} />
          <StyledButton label="Lock Model" handleClick={lockModel} />
          <StyledButton label="Unlock Model" handleClick={unlockModel} />
          <StyledButton
            label="Log Out"
            handleClick={logout}
            sx={{ marginTop: 'auto' }}
          />
          <AddActivityModal
            isModalOpen={isModalOpen}
            handleClose={handleClose}
            handleAddActivity={handleAddActivity}
            model={model}
          />
        </MenuContainer>
        <ActionsSpeedDial actions={actions} />
        <CanvasContainer item sm={9}>
          {engine && <CanvasWidget engine={engine} className="canvas-widget" />}
        </CanvasContainer>
        <ZoomControls>
          <IconButton
            color="primary"
            aria-label="Zoom in"
            onClick={() => engine.zoomToFitSelectedNodes({ margin: 200 })}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Zoom out"
            onClick={() => engine.zoomToFitSelectedNodes({ margin: 500 })}
          >
            <ZoomOutIcon />
          </IconButton>
        </ZoomControls>
      </Grid>
    </EditorWrapper>
  );
};

export default Editor;
