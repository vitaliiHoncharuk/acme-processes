import React, { useState } from 'react';
import { MenuItem, Select, TextField, InputLabel } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import Modal from '../Modal/Modal';
import { DiagramModel } from '@projectstorm/react-diagrams';
import { useNotification } from '../../Notification/NotificationContext';
import { StyledAddButton } from './addActivityModal.styles';

interface AddActivityModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  handleAddActivity: (
    activityName: string,
    color: string,
    selectedActivity: string,
  ) => void;
  model: DiagramModel;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isModalOpen,
  handleClose,
  handleAddActivity,
  model,
}) => {
  const [activityName, setActivityName] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [color, setColor] = useState<string>('#ffffff');
  const { setNotification } = useNotification();

  const handleColorChange = (newValue: string) => {
    setColor(newValue);
  };

  const handleConfirm = () => {
    handleAddActivity(activityName, color, selectedActivity);
    setNotification({
      message: `Activity ${activityName} added successfully!`,
      severity: 'success',
    });
    resetValues();
    handleClose();
  };

  const resetValues = () => {
    setSelectedActivity('');
    setColor('#fff');
    setActivityName('');
  };

  const existingActivities = model.getNodes();

  return (
    <Modal
      open={isModalOpen}
      title="Add Activity"
      onClose={handleClose}
      onConfirm={handleConfirm}
      disableActions
    >
      <InputLabel id="activity-name">Activity Name</InputLabel>
      <TextField
        placeholder="Activity Name"
        id="activity-name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        autoComplete="off"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      {existingActivities.length > 0 && (
        <>
          <InputLabel id="select-node" className="select-label">
            Select Activity
          </InputLabel>
          <Select
            id="select-node"
            fullWidth
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ marginBottom: 2 }}
          >
            {existingActivities.map((node, index) => (
              <MenuItem key={index} value={node.getOptions().extras.name}>
                {node.getOptions().extras.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      <InputLabel id="color-picker" className="select-label">
        Activity Color
      </InputLabel>
      <div>
        <MuiColorInput
          id="color-picker"
          value={color}
          onChange={handleColorChange}
        />
      </div>
      <StyledAddButton
        variant="contained"
        color="secondary"
        onClick={handleConfirm}
        sx={{ marginTop: 2 }}
        fullWidth
      >
        Add
      </StyledAddButton>
    </Modal>
  );
};

export default AddActivityModal;
