import React, { useState } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { Card, Input, Divider, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import * as actionTypes from "./store/action";
import "antd/dist/antd.css";
import "./App.css";
import TodoList from "./components/todo-list/TodoList";

const todoFilter = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const App = (props) => {
  const [todoFilterType, setTodoFilterType] = useState(todoFilter.ALL);

  /**
   * This method is event handler.
   * It creates TODO by calling redux
   * dispatcher method onCreateTodo.
   *
   * @param {event} e
   */
  const createTodo = (e) => {
    e.preventDefault();
    if (!!props.todo) {
      props.onCreateTodo({
        id: uuid(),
        todo: props.todo,
        isCompleted: false,
      });
    }
  };

  /**
   * This method is event handler.
   * It updates TODO by calling redux
   * dispatcher method onUpdateTodo.
   *
   * @param {event} e
   */
  const updateTodo = (e) => {
    e.preventDefault();
    const todoList = props.todoList.slice();
    const editedItem = todoList.find((item) => item.id === props.editTodoId);
    const editedItemIndex = todoList.findIndex(
      (item) => item.id === props.editTodoId
    );
    editedItem.todo = props.editedTodo;
    if (!!props.editedTodo) {
      todoList.splice(editedItemIndex, 1, editedItem);
      const stateObj = {
        todoList,
        editTodoId: "",
        editedTodo: "",
        isEdit: false,
      };
      props.onUpdateTodo(stateObj);
    }
  };

  /**
   * Input event handler.
   * Set state on by calling
   * diispatch method onChangeTodo.
   *
   * @param {event} e
   */
  const handleOnChange = (e) => {
    e.preventDefault();
    props.onChangeTodo(e.target.value);
  };

  /**
   * Edit Input event handler.
   * Set state on by calling
   * diispatch method onChangeEditTodo.
   *
   * @param {event} e
   */
  const handleEditOnChange = (e) => {
    e.preventDefault();
    props.onChangeEditTodo(e.target.value);
  };

  /**
   * Event handler for double click.
   * Double click on todo item pass todo id
   * to this method and dispatch action to
   * edit todo by executing onEditTodo.
   *
   * @param {string} id
   */
  const handleDoubleClick = (id) => {
    const editedItem = props.todoList.find((item) => item.id === id);
    props.onEditTodo({
      isEdit: true,
      editTodoId: id,
      editedTodo: editedItem.todo,
    });
  };

  /**
   * By clicking on the checkbox of todo item
   * pass todo object to this method. It dispatch
   * onCheckTodo method.
   *
   * @param {object} item
   */
  const handleCheck = (item) => {
    const todoList = props.todoList.slice();
    const todoItem = todoList.find((it) => it.id === item.id);
    todoItem.isCompleted = !todoItem.isCompleted;
    const index = todoList.findIndex((it) => it.id === item.id);
    todoList.splice(index, 1, todoItem);
    props.onCheckTodo(todoList);
  };

  /**
   * By clicking on the close icon of todo item
   * pass todo object to this method. It dispatch
   * onCheckTodo method.
   *
   * @param {object} item
   */
  const deleteSingleTodo = (item) => {
    const newTodoList = props.todoList.slice();
    const todoList = newTodoList.filter((it) => it.id !== item.id);
    props.onDeleteTodo(todoList);
  };

  // How much active todo items left
  const itemLeft = () => {
    const len = props.todoList.filter((item) => !item.isCompleted).length;
    if (len > 1) {
      return <span className="items-left">{len} items left</span>;
    }
    return <span className="items-left">{len} item left</span>;
  };

  // Clear completed node for clear complete todo from list
  const renderClearCompleted = () => {
    const notCompletedTodoList = props.todoList.filter(
      (item) => !item.isCompleted
    );
    const len = props.todoList.filter((item) => item.isCompleted).length;
    if (len > 0) {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className="clear-footer-button"
          onClick={(e) => {
            e.preventDefault();
            props.onClearCompletedTodo(notCompletedTodoList);
          }}
        >
          Clear Completed
        </a>
      );
    }
    return null;
  };

  const footerButtonStyle = (filterType) => {
    if (todoFilterType === filterType) {
      return "footer-button__active";
    }
    return "footer-button";
  };

  // Card element with input and todo list rendered conditionally
  const renderedCard = () => {
    if (props.todoList.length) {
      const todoProps = {
        isEdit: props.isEdit,
        isHovered: props.isHovered,
        editTodoId: props.editTodoId,
        editedTodo: props.editedTodo,
        updateTodo: updateTodo,
        deleteSingleTodo: deleteSingleTodo,
        handleCheck: handleCheck,
        handleEditOnChange: handleEditOnChange,
        handleDoubleClick: handleDoubleClick,
      };

      let todoList = props.todoList.slice();
      if (todoFilterType === todoFilter.ACTIVE)
        todoList = todoList.filter((item) => !item.isCompleted);
      else if (todoFilterType === todoFilter.COMPLETED)
        todoList = todoList.filter((item) => item.isCompleted);

      return (
        <div className="layout">
          <Card className="card-panel">
            <DownOutlined className="down-icon" />
            <Input
              className="text-input"
              autoFocus={true}
              placeholder="What needs to be done?"
              name="todo"
              onChange={handleOnChange}
              onPressEnter={createTodo}
              value={props.todo}
            />

            <TodoList {...props} {...todoProps} todoList={todoList} />

            <Divider className="divider" />
            <div className="card-footer">
              <div className="card-footer__first">{itemLeft()}</div>
              <div className="card-footer__second">
                <Button
                  type="text"
                  size="small"
                  className={footerButtonStyle(todoFilter.ALL)}
                  onClick={() => setTodoFilterType(todoFilter.ALL)}
                >
                  <span>All</span>
                </Button>
                <Button
                  type="text"
                  size="small"
                  className={footerButtonStyle(todoFilter.ACTIVE)}
                  onClick={() => setTodoFilterType(todoFilter.ACTIVE)}
                >
                  <span>Active</span>
                </Button>
                <Button
                  type="text"
                  size="small"
                  className={footerButtonStyle(todoFilter.COMPLETED)}
                  onClick={() => setTodoFilterType(todoFilter.COMPLETED)}
                >
                  <span>Completed</span>
                </Button>
              </div>
              <div className="card-footer__third">{renderClearCompleted()}</div>
            </div>
          </Card>
          <div className="card-div-one"></div>
          <div className="card-div-two"></div>
        </div>
      );
    }
    return (
      <div className="layout">
        <Card className="card-panel">
          <Input
            className="text-input"
            autoFocus={true}
            placeholder="What needs to be done?"
            name="todo"
            onChange={handleOnChange}
            onPressEnter={createTodo}
            value={props.todo}
          />
        </Card>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="app-title__box">
        <span className="app-title">todos</span>
      </div>
      {renderedCard()}
    </div>
  );
};

/**
 * This method need to pass to connect method as parameter
 *
 * @param {object} state
 */
const mapStateToProps = (state) => {
  return state;
};

/**
 * This method need to pass to connect method as parameter
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTodo: (todo) => dispatch({ type: actionTypes.CHANGE_TODO, todo }),
    onChangeEditTodo: (todo) =>
      dispatch({ type: actionTypes.CHANGE_EDIT_TODO, todo }),
    onCreateTodo: (todoObj) =>
      dispatch({ type: actionTypes.CREATE_TODO, todoObj }),
    onEditTodo: (editTodoObj) =>
      dispatch({ type: actionTypes.EDIT_TODO, editTodoObj }),
    onUpdateTodo: (stateObj) =>
      dispatch({ type: actionTypes.UPDATE_TODO, stateObj }),
    onDeleteTodo: (todoList) =>
      dispatch({ type: actionTypes.DELETE_TODO, todoList }),
    onCheckTodo: (todoList) =>
      dispatch({ type: actionTypes.CHECK_TODO, todoList }),
    onClearCompletedTodo: (todoList) =>
      dispatch({ type: actionTypes.CLEAR_COMPLETE_TODO, todoList }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
