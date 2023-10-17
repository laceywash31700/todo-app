import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ incomplete }) => {
  return (
    <header data-testid="todo-header">
      <Typography variant="h4" data-testid="todo-h1" sx={{ marginLeft: '100px' }}>
        To Do List: {incomplete.length} items pending
      </Typography>
    </header>
  );
};

export default Header;