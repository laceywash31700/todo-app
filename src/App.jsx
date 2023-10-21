import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Todo from "./Components/Todo";
import light from "./Components/Themes/light";
import dark from "./Components/Themes/dark";

// NOTE TO SELF:

// This the  UserContext or global state its a object that you need to deconstruct first...
// user: {
//   name: '',
//   email: '',
// },
// settings: {
//   displayCount: 3,
//   hideCompletedItems: false,
//   sortWord: 'difficulty',
//   theme: null
// }

// like so..
// const { settings, user } = useContext(UserContext);

// then you can decontruct like this...
// const { hideCompletedItems, displayCount } = settings;

// or this...
// const {name, email } = user
export const UserContext = React.createContext({});

const App = () => {
  const [theme, setTheme] = useState(light);
  const [displayCount, setDisplayCount] = useState(3);
  const [sortWord, setSortWord] = useState("difficulty");
  const [hideCompletedItems, setHideCompletedItems] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          user: {
            name: "",
            email: "",
          },
          settings: {
            displayCount,
            setDisplayCount,
            hideCompletedItems,
            toggleHideCompletedItems: (item) => setHideCompletedItems(item),
            sortWord,
            setSortWord,
            theme,
            toggleTheme: () => setTheme(theme === light ? dark : light )
          },
        }}
      >
        <CssBaseline />
        <Todo />
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
