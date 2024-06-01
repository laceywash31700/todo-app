import React, { useContext, useState } from "react";
import { When } from "react-if";
import { Dialog, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from "@mui/material";
import { AuthContext } from "../Context/Settings/context.jsx";

const rolesPermissions = {
  Administrator: ["create", "update", "delete", "read"],
  Editor: ["create", "update", "read"],
  Writer: ["create", "read"],
  User: ["read"]
};

const Login = () => {
  const context = useContext(AuthContext);
  const [state, setState] = useState({ username: "", password: "" });
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState([]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setPermissions(rolesPermissions[role] || []);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    context.login(state.username, state.password);
    setOpen(false); // Close the modal after submission
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await context.signUp(state.username, state.password, selectedRole);
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
      <When condition={context.isLoggedIn}>
        <Button onClick={context.logout}>Log Out</Button>
      </When>

      <When condition={!context.isLoggedIn}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Login
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <form onSubmit={handleLogin}>
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  {Object.keys(rolesPermissions).map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedRole && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Permissions for {selectedRole}:</Typography>
                  <ul>
                    {permissions.map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
                </Box>
              )}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button type="submit" variant="contained" color="primary" style={{ flex: 1 }} onClick={handleLogin}>
                  Login
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ flex: 1 }} onClick={handleSignUp}>
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
