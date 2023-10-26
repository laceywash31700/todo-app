import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Todo from "./Components/Todo";
import light from "./Components/Themes/light";
import dark from "./Components/Themes/dark";
import LoginProvider from "./Components/Context/Settings/context";
// NOTE TO SELF:

export const UserContext = React.createContext({});

const App = () => {
  const [theme, setTheme] = useState(light);
  const [displayCount, setDisplayCount] = useState(3);
  const [sortWord, setSortWord] = useState("difficulty");
  const [hideCompletedItems, setHideCompletedItems] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <UserContext.Provider
          value={{
            settings: {
              displayCount,
              setDisplayCount,
              hideCompletedItems,
              toggleHideCompletedItems: (item) => setHideCompletedItems(item),
              sortWord,
              setSortWord,
              theme,
              toggleTheme: () => setTheme(theme === light ? dark : light),
            },
          }}
        >
          <CssBaseline />

          <Todo />

        </UserContext.Provider>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default App;
