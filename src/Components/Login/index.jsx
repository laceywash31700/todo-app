import { useContext, useState } from "react";
import { When } from "react-if";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import { LoginContext } from "../Context/Settings/context.jsx";

const Login = () => {
  const context = useContext(LoginContext);
  const [state, setState] = useState({ username: "", password: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(state.username, state.password);
    setOpen(false); // Close the modal after submission
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <When condition={context.loggedIn}>
        <Button onClick={context.logout}>Log Out</Button>
      </When>

      <When condition={!context.loggedIn}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Login
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Username"
                name="username"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
               <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button type="submit" variant="contained" color="primary" style={{ flex: 1 }} onClick={handleSubmit}>
                  Login
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ flex: 1 }}>
                  Signup
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </When>
    </>
  );
};

export default Login;
