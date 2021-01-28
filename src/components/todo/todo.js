import React, { useState } from "react";
import PropTypes from "prop-types";

import { Input } from "antd";

import Icon from "@ant-design/icons";
import Close from "../../icons/CloseIcon";
import CheckedCircleIcon from "../../icons/CheckedCircleIcon";
import UnCheckedCircleIcon from "../../icons/UncheckedCircleIcon";

const Todo = ({
  item,
  isEdit,
  updateTodo,
  editedTodo,
  editTodoId,
  handleCheck,
  handleEditOnChange,
  deleteSingleTodo,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const checkbox = (item) => {
    if (item.isCompleted) {
      return (
        <Icon
          component={CheckedCircleIcon}
          className="check-icon"
          onClick={() => handleCheck(item)}
        />
      );
    }
    return (
      <Icon
        component={UnCheckedCircleIcon}
        className="check-icon"
        onClick={() => handleCheck(item)}
      />
    );
  };

  if (isEdit && item.id === editTodoId) {
    return (
      <Input
        className="text-input__edit"
        autoFocus={true}
        name="editTodo"
        onChange={handleEditOnChange}
        onPressEnter={updateTodo}
        onClick={updateTodo}
        value={editedTodo}
      />
    );
  }

  return (
    <div
      className="todo-div"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      {checkbox(item)}
      <span className={item.isCompleted ? "check-text" : ""}>{item.todo}</span>
      {isHovered && (
        <Icon
          component={Close}
          className="close-icon"
          onClick={() => deleteSingleTodo(item)}
        />
      )}
    </div>
  );
};

Todo.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  updateTodo: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  editTodoId: PropTypes.string.isRequired,
  editedTodo: PropTypes.string.isRequired,
  deleteSingleTodo: PropTypes.func.isRequired,
  handleEditOnChange: PropTypes.func.isRequired,
};

export default Todo;
