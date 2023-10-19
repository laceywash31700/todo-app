import React, { useState, useContext, useEffect } from "react";
import MaterialUISwitch from "../Themes/switch";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  FormLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserContext } from "../../App";

// user: {
//     name: "",
//     email: "",
//   },
//   settings: {
//     displayCount: 3,
//     hideCompletedItems: false,
//     sortWord: "difficulty",
//     theme,
//     toggleTheme: () => setTheme(theme === light ? dark : light )
//   },

function SettingsModal() {
  const { settings } = useContext(UserContext);
  const { theme, toggleTheme, hideCompletedItems, setSortWord, toggleHideCompletedItems} = settings;
  const [open, setOpen] = useState(false);


//   handelers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompleted = (e) => {
    e.preventDefault();
    toggleHideCompletedItems()
  };

  const handleCount = () => {};

  const handleSort = () => {};

  const handleSubmit = () => {}

  useEffect(() => {
    console.log('Updated hideCompletedItems:', hideCompletedItems);
  }, [hideCompletedItems]); 


  const renderSettingsForm = () => {
    return (
      <div>
        <FormControl fullWidth margin="normal">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <FormLabel>Dark Mode</FormLabel>
              <MaterialUISwitch
                checked={theme.palette.mode === "dark"}
                onChange={toggleTheme}
                inputProps={{ "aria-label": "toggle dark mode" }}
              />
            </Grid>
            <Grid item xs={6} textAlign="right">
              <FormControlLabel
                control={<Switch color="primary" />}
                onChange={handleCompleted}
                label="Hide completed items"
                // Add your logic to handle the state change
              />
            </Grid>
          </Grid>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Filter and Sorting Options
        </Typography>
        <FormControl fullWidth margin="normal">
          <FormLabel>Items Per Page</FormLabel>
          <TextField
            id="itemsPerPage"
            type="number"
            variant="outlined"
            // Add your logic to handle the input value
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Sort By</FormLabel>
          <Select
            label="Sort By"
            // Add your logic to handle the selected value
          >
            <MenuItem value="difficulty">Difficulty</MenuItem>
            {/* You can add more sorting options here */}
          </Select>
        </FormControl>
      </div>
    );
  };


  return (
    <div>
      <Button variant="text" onClick={handleOpen}>
        <SettingsIcon style={{ fontSize: 36 }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>{renderSettingsForm()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SettingsModal;
