import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Todo from './Components/Todo';
export const UserContext = React.createContext({})

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


export default class App extends React.Component {
  render() {
    return (
      <UserContext.Provider value={{
        user: {
          name: '',
          email: '',
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
