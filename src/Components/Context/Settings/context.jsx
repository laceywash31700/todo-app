import { useCallback, useEffect, useState, createContext } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_SERVER;


export const AuthContext = createContext();

const AuthProvider = (props) => {
  const capabilities = {
    Administrator: ["create", "update", "delete", "read"],
    Editor: ["create", "update", "read"],
    Writer: ["create", "read"],
    User: ["read"],
  };

  const [state, setState] = useState({
    isLoggedIn: false,
    user: { capabilities: [] },
    error: null,
    token: null
  });

const setAuthState = (isLoggedIn, token, user, error) => {
    if (isLoggedIn) {
      cookie.save("auth", token);
    } else {
      cookie.remove("auth");
    }
    setState({ token, isLoggedIn, user, error: error || null });
  };


  const can = (capability) => {
    return state?.user?.capabilities?.includes(capability);
  };

  const validateToken = useCallback((token) => {
    try {
      let user = jwt_decode(token);
      if (user.expiresIn * 1000 < Date.now()) {
        throw new Error("Token expired");
      }
      else{
      user.capabilities = capabilities[user.capabilities];
      setAuthState(true, token, user)
      }
    } catch (e) {
      setAuthState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  }, []);

  

  const logout = () => {
    setAuthState(false, null, {});
  };

  const login = async (username, password) => {
    let { loggedIn, user } = state;
    const config = {
      baseURL: url,
      url: "/signin",
      method: "post", 
      auth: { username, password },
    };
    const response = await axios(config);
    const auth = response.data;
    if (auth && auth.username === username) {
      try {
        const token = auth.token;
        validateToken(token);
      } catch (e) {
        setAuthState(loggedIn, token, user, e);
        console.error(e);
      }
    }
  };

    const signUp = async (username, password, role) => {
      try {
        // Make a POST request to your signup endpoint
        const response = await axios.post(`${url}/signup`, {
          username: username,
          password: password,
          role: role,
        });
        // Handle the response
        if (response.status === 201) {
          // If signup was successful, save the token in a cookie
          const token = response.data.token;  
          validateToken(token); // Call the validateToken function to set the user's authentication state

        } else {
          // If signup failed, handle the error
          console.error("Signup failed:", response.data.error);
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error signing up:", error);
      }
    };
  

  useEffect(() => {
    if (state.user) return;
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, [state.user.capabilities]);

  return (
    <AuthContext.Provider
      value={{ ...state, can: can, login: login, logout: logout, signUp: signUp }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
