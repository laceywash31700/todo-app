import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Todo from './Components/Todo';
export const UserContext = React.createContext({})

export default class App extends React.Component {
  render() {
    return (
      <UserContext.Provider value={{
        user: {
          name: '',
          email: '',
          password: '',
        },
        settings: {
          displayCount: 3,
          hideCompletedItems: false,
          sortWord: 'difficulty',
          theme: null
        }
      }}>
        <CssBaseline />
        <Todo />
      </UserContext.Provider>
    );
  }
}
