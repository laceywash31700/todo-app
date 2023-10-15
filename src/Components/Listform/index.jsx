import React from 'react';
import { Button, FormControl, FormLabel, Slider, TextField, Typography } from '@mui/material';

const Listform = ({ handleChange, defaultValues, handleSubmit }) => {
    return (


        <FormControl fullWidth sx={{ border: '2px solid #ccc', borderRadius: '4px', padding: '10px' }}>
            <Typography variant="h5" gutterBottom>
                Add Task
            </Typography>
            <FormLabel htmlFor="text">To Do Item</FormLabel>
            <TextField
                id="text"
                onChange={handleChange}
                name="text"
                multiline
                rows={4}
                type="text"
                placeholder="Item Details"
            />

            <FormLabel htmlFor="assignee">Assigned To</FormLabel>
            <TextField
                id="assignee"
                onChange={handleChange}
                name="assignee"
                type="text"
                placeholder="Assignee Name"
            />

            <Typography id="difficulty" gutterBottom>
                Difficulty
            </Typography>
            <Slider onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                valueLabelDisplay="auto"
                type="range"
                min={1}
                max={5}
                aria-labelledby="difficulty"
            />

            <Button type="submit" variant="contained" onClick={handleSubmit}>Add Item</Button>

        </FormControl>
    )
}

export default Listform