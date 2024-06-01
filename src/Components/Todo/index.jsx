import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import { v4 as uuid } from "uuid";
import Header from "../Header";
import List from "../List";
import ListForm from "../Listform";
import Auth from "../Context/Settings/auth";
import axios from "axios";

// NOTE TO SELF:

const Todo = () => {
  const [value] = useState({ difficulty: 4 });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, value);

async function callApi(config) {
 const response = await axios(config);
 console.log(`I am the response from a ${config.method} request`,response.data)
 return response.data;
}

useEffect(() => {
  (async () =>{
   const items = await axios.get(`https://lab34server.onrender.com/todo`);
   setList(items.data);
  })();
}, [])

 async function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
    const config = {
      baseURL: `https://lab34server.onrender.com`,
      url: "/todo",
      method: "post",
      data:  item ,
    };
    try{
      const data = await callApi(config);
      console.log(data);
    } catch(e){
      console.error(e)
    }
  }

 async function deleteItem(id) {
    const config = {
      baseURL: `https://lab34server.onrender.com`,
      url: `/todo/${id}`,
      method: "delete",
    };
    const items = list.filter((item) => item.id !== id);
    setList(items);
    try{
      const data = await callApi(config);
      console.log(data);
    } catch(e){
      console.error(e)
    }
  }

 async function toggleComplete(id) {
    let updatedItem;
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return updatedItem = item;
    });
    setList(items);

    const config = {
      baseURL: `https://lab34server.onrender.com`,
      url: `/todo/${id}`,
      method: "put",
      data: updatedItem,
    };
    try{
      const data = await callApi(config);
      console.log(data);
    } catch(e){
      console.error(e)
    }
    
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
  }, [list]);

  return (
    <>
      <Header incomplete={incomplete} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >

          <div style={{ width: "20%" }}>
            <ListForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              incomplete={incomplete}
              listNum={list.length}
              list={list} />
          </div>
       

        <div style={{ width: "45%" }}>
         
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
