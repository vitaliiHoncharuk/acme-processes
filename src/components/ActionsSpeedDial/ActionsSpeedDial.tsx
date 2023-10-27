import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

export interface SpeedDialAction {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
}
export interface ActionsSpeedDialProps {
  actions: Array<SpeedDialAction>;
}

const ActionsSpeedDial = ({ actions }: ActionsSpeedDialProps) => (
  <SpeedDial
    ariaLabel="SpeedDial"
    sx={{ position: 'absolute', bottom: 16, right: 16 }}
    icon={<SpeedDialIcon />}
  >
    {actions.map((action) => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={action.onClick}
      />
    ))}
  </SpeedDial>
);

export default ActionsSpeedDial;
