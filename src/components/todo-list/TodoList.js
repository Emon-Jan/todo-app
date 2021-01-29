import React from "react";
import { List, Divider } from "antd";
import Todo from "../todo/todo";

const TodoList = (props) => {
  return props.todoList.map((item) => (
    <div key={item.id}>
      <Divider className="divider" />
      <List
        itemLayout="horizontal"
        className="list-item"
        onDoubleClick={(e) => {
          e.preventDefault();
          if (!item.isCompleted) {
            props.handleDoubleClick(item.id);
          }
        }}
      >
        <Todo item={item} {...props}></Todo>
      </List>
    </div>
  ));
};

export default TodoList;
