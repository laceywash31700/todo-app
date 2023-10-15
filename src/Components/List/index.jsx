import React, { useContext, useMemo } from 'react';
import { Card, CardContent, Typography, Checkbox, Divider, Chip } from '@mui/material';
import { UserContext } from '../../App';

function List({ list, toggleComplete, incomplete, deleteItem }) {
  const hideCompletedItems = useContext(UserContext);

  const task = hideCompletedItems ? list : incomplete ;
  
  return (
    task.map(item => (
      <Card variant="outlined" key={item.id} style={{ marginBottom: '10px' }} fullWidth sx={{ border: '2px solid #ccc', borderRadius: '4px', padding: '10px' }}>
        <CardContent>
          <Typography variant="h6">{item.text}</Typography>
          <Typography variant="body2">Assigned to: {item.assignee}</Typography>
          <Typography variant="body2">Difficulty: {item.difficulty}</Typography>
          <div style={{ cursor: 'pointer' }} onClick={() => toggleComplete(item.id)}>
            Completed: <Checkbox checked={item.complete} disabled />
          </div>
          <Chip
            onDelete={() => deleteItem(item.id)}
            label="Delete"
            sx={{
              '& .MuiChip-deleteIcon': {
                margin: '0 auto',
              },
            }}
          />

        </CardContent>
        <Divider />
      </Card>
    ))
  )
}

export default List