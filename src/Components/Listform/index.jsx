import React, { useContext } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import SettingsModal from "../SettingsModal";

const Listform = ({ handleChange, values, handleSubmit }) => {
  return (
    <FormControl
      sx={{ border: "2px solid #ccc", borderRadius: "4px", padding: "10px" }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Typography variant="h5" gutterBottom>
            Add Task
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="right">
          <SettingsModal />
        </Grid>
      </Grid>

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
      <Slider
        value={values}
        name="difficulty"
        onChange={handleChange}
        defaultValue={4}
        valueLabelDisplay="auto"
        type="range"
        min={1}
        max={5}
        aria-labelledby="difficulty"
      />

      <Button type="submit" variant="contained" onClick={handleSubmit}>
        Add Item
      </Button>
    </FormControl>
  );
};

export default Listform;
