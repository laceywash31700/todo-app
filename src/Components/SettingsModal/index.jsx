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

function SettingsModal({listNum}) {
  const { settings } = useContext(UserContext);
  const { theme, toggleTheme, hideCompletedItems, displayCount, setDisplayCount, toggleHideCompletedItems, sortWord, setSortWord} = settings;
  const [open, setOpen] = useState(false);


//   handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompleted = () => {
    toggleHideCompletedItems(!hideCompletedItems);
  };

  const handleCount = (e) => {
    setDisplayCount(e.target.value);
    e.preventDefault()
  };

  const handleSort = (e) => {
    e.preventDefault()
    setSortWord(e.target.value)
    };


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
                checked={hideCompletedItems} 
                label="Hide completed items"
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
            defaultValue={displayCount}
            variant="outlined"
            inputProps={{
              min:1,
              max:listNum
            }}
            onChange={handleCount}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Sort By</FormLabel>
          <Select
            label="Sort By"
            onChange={handleSort}
            defaultValue={sortWord}
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SettingsModal;
