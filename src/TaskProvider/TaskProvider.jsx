import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext({
  todoList: [],
  onProgressList: [],
  doneList: [],
  setTodoList: () => {},
  setOnProgressList: () => {},
  setDoneList: () => {},
  updateLists: () => {}, // Function to update lists after drag-and-drop
});

const TaskProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [onProgressList, setOnProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const updateLists = (sourceList, destinationList, draggedItem) => {
    // Update lists based on drag-and-drop operation
    const updatedSourceList = sourceList.filter(
      (item) => item._id !== draggedItem._id
    );
    const updatedDestinationList = [...destinationList, draggedItem];
    setTodoList(updatedSourceList);
    setOnProgressList(updatedDestinationList);
    setDoneList(todoList.length === updatedSourceList.length ? doneList : updatedDestinationList); // Update doneList if dragged from to-do
  };

  return (
    <TaskContext.Provider
      value={{
        todoList,
        onProgressList,
        doneList,
        setTodoList,
        setOnProgressList,
        setDoneList,
        updateLists,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };