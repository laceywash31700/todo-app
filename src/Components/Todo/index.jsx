import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';
import Header from './Header';
import List from '../List';
import Listform from '../Listform';
import mockItems from './mockItems.json'



const Todo = () => {
  const [defaultValues] = useState({difficulty: 4});
  const [list, setList] = useState(mockItems);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
    setIncomplete([...incomplete,item]);
    console.log('im in add item', incomplete)
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
  }, [list]);  


  return (
    <>
      <Header incomplete={incomplete}/>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div style={{ width: '20%' }}>
          <Listform
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        </div>
        <div style={{ width: '45%' }}>
          <List 
            list={list}
            toggleComplete={toggleComplete}
            incomplete={incomplete}
            deleteItem={deleteItem}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
