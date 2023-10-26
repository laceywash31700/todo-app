import React from "react";
import { Typography } from "@mui/material";
import Login from "../Login";


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
      <Login/>
    </header>
  );
};

export default Header;
