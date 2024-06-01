import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Divider,
  Chip,
  Pagination,
} from "@mui/material";
import { UserContext } from "../../App";
import Auth from "../Context/Settings/auth";



function List({ list, toggleComplete, incomplete, deleteItem }) {
  // setup use context and grab global props
  const { settings } = useContext(UserContext);
  const { hideCompletedItems, displayCount , sortWord} = settings;
  
  // for my pagination
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  // start Idx for my pagination, to be used in slice as first arg
  const startIdx = useMemo(() => {
    return (page - 1) * displayCount;
  }, [page, displayCount]);

  // end Idx for my pagination, to be used in slice as second arg
  const endIdx = useMemo(() => {
    return startIdx + displayCount;
  }, [startIdx, displayCount]);

  // decides which arr to use in render return 
  const task = useMemo(() => {
    return hideCompletedItems ? incomplete : list;
  }, [hideCompletedItems, list, incomplete]);

  // for setting the count of pages to select and in pagination component
  useEffect(() => {
    let pages = Math.floor(task.length / displayCount);
    pages += task.length % displayCount !== 0 ? 1 : 0;
    setCount(pages);
  }, [displayCount, task]);

  // changes sets page number and sets the idx's from start and end Idx
  const handleChange = (e, page) => {
    setPage(page);
  };

  return (
    <>
      {task.sort((a,b)=> a[sortWord] - b[sortWord]).slice(startIdx, endIdx).map((item) => {
      return(
        <Card
          variant="outlined"
          key={item.id}
          style={{ marginBottom: "10px" }}
          sx={{
            border: "2px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
          }}
        >
          <CardContent>
            <Typography variant="h6">{item.text}</Typography>
            <Typography variant="body2">
              Assigned to: {item.assignee}
            </Typography>
            <Typography variant="body2">
              Difficulty: {item.difficulty}
            </Typography>
            <Auth capability= "update">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => toggleComplete(item.id)}
            >
              Completed: <Checkbox checked={item.complete} disabled />
            </div>
            </Auth>
            <Auth capability ={'update'}>
            <Chip
              onDelete={() => deleteItem(item.id)}
              label="Delete"
              sx={{
                "& .MuiChip-deleteIcon": {
                  margin: "0 auto",
                },
              }}
            />
            </Auth>
          </CardContent>
          <Divider />
        </Card>)
})}
    <Auth capability= {"read"}>
      <Typography
        sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        Page: {page}
      </Typography>
      <Pagination 
        sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
        count={count}
        variant="outlined"
        color="primary"
        onChange={handleChange}
      /></Auth>
    </>
  );
}

export default List;
