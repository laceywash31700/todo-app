import React, { useContext } from "react";
import { Typography, FormControlLabel, FormGroup } from "@mui/material";


// palette: {
//   mode: 'dark',
//   primary: {
//     main: '#90caf9',
//   },
//   secondary: {
//     main: '#ce93d8',
//   },
//   background: {
//     default: '#121212',
//     paper: '#121212',
//   },
// }

const Header = ({ incomplete }) => {
  return (
    <header
      data-testid="todo-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        data-testid="todo-h1"
        sx={{ marginLeft: "100px" }}
      >
        To Do List: {incomplete.length} items pending
      </Typography>
    </header>
  );
};

export default Header;
