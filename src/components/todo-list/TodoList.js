import React from "react";

import { Input, List, Divider } from "antd";
import Icon from "@ant-design/icons";

import Close from "../../icons/CloseIcon";
import CheckedCircleIcon from "../../icons/CheckedCircleIcon";
import UnCheckedCircleIcon from "../../icons/UncheckedCircleIcon";
import PropTypes from "prop-types";

function TodoList(props) {
  const checkbox = (item) => {
    if (item.isCompleted) {
      return (
        <Icon
          component={CheckedCircleIcon}
          className="check-icon"
          onClick={() => props.handleCheck(item)}
        />
      );
    }
    return (
      <Icon
        component={UnCheckedCircleIcon}
        className="check-icon"
        onClick={() => props.handleCheck(item)}
      />
    );
  };

  const todoEditableList = (item, index) => {
    if (props.isEdit && item.id === props.editTodoId) {
      return (
        <Input
          className="text-input__edit"
          autoFocus={true}
          name="editTodo"
          onChange={props.handleEditOnChange}
          onPressEnter={props.updateTodo}
          onClick={props.updateTodo}
          value={props.editedTodo}
        />
      );
    }
    return (
      <div
        onMouseEnter={() => props.handleMouseEnter(index)}
        onMouseLeave={() => props.handleMouseLeave(index)}
      >
        {checkbox(item)}
        <span className={item.isCompleted ? "check-text" : ""}>
          {item.todo}
          {props.isHovered[index] && (
            <Icon
              component={Close}
              className="close-icon"
              onClick={() => props.deleteSingleTodo(item)}
            />
          )}
        </span>
      </div>
    );
  };

  return props.todoList.map((item, index) => (
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
        {todoEditableList(item, index)}
      </List>
    </div>
  ));
}

TodoList.propType = {
  isEdit: PropTypes.bool.isRequired,
  todoList: PropTypes.array.isRequired,
  isHovered: PropTypes.object.isRequired,
  editTodoId: PropTypes.string.isRequired,
  editedTodo: PropTypes.string.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteSingleTodo: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleEditOnChange: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
};

export default TodoList;
