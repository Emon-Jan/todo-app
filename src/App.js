import React, { Component } from "react";
import { Card, Input, Divider, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";

import { Link, Route, Switch, withRouter } from "react-router-dom";
import uuid from "react-uuid";

import Todos from "./components/todos/Todos";
import Activetodos from "./components/activetodo/Activetodos";
import Completetodos from "./components/completetodo/Completetodos";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    todo: "",
    editedTodo: "",
    todoList: [],
    isEdit: false,
    editTodoId: null,
    isHovered: {},
  };

  createTodo = (e) => {
    e.preventDefault();
    if (!!this.state.todo) {
      this.setState({
        todoList: [
          ...this.state.todoList,
          { id: uuid(), todo: this.state.todo, isCompleted: false },
        ],
        todo: "",
      });
    }
  };

  updateTodo = (e) => {
    e.preventDefault();
    const todoList = this.state.todoList.slice();
    const editedItem = todoList.find(
      (item) => item.id === this.state.editTodoId
    );
    const editedItemIndex = todoList.findIndex(
      (item) => item.id === this.state.editTodoId
    );
    editedItem.todo = this.state.editedTodo;
    if (!!this.state.editedTodo) {
      todoList.splice(editedItemIndex, 1, editedItem);
      const stateObj = {
        todoList,
        editTodoId: null,
        editedTodo: "",
        isEdit: false,
      };
      this.setState(stateObj);
    }
  };

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ todo: e.target.value });
  };

  handleEditOnChange = (e) => {
    e.preventDefault();
    this.setState({ editedTodo: e.target.value });
  };

  handleDoubleClick = (id) => {
    const editedItem = this.state.todoList.find((item) => item.id === id);
    this.setState({
      isEdit: true,
      editTodoId: id,
      editedTodo: editedItem.todo,
    });
  };

  handleCheck = (item) => {
    const todoList = this.state.todoList.slice();
    const todoItem = todoList.find((it) => it.id === item.id);
    todoItem.isCompleted = !todoItem.isCompleted;
    const index = todoList.findIndex((it) => it.id === item.id);
    todoList.splice(index, 1, todoItem);
    this.setState({ todoList });
  };

  deleteSingleTodo = (item) => {
    const newTodoList = this.state.todoList.slice();
    const todoList = newTodoList.filter((it) => it.id !== item.id);
    this.setState({ todoList });
  };

  handleMouseEnter = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };

  render() {
    const itemLeft = () => {
      const len = this.state.todoList.filter((item) => !item.isCompleted)
        .length;
      if (len > 1) {
        return <span className="items-left">{len} items left</span>;
      }
      return <span className="items-left">{len} item left</span>;
    };

    const renderClearCompleted = () => {
      const notCompletedTodoList = this.state.todoList.filter(
        (item) => !item.isCompleted
      );
      const len = this.state.todoList.filter((item) => item.isCompleted).length;
      if (len > 0) {
        return (
          <a
            className="clear-footer-button"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ todoList: notCompletedTodoList });
            }}
          >
            Clear Completed
          </a>
        );
      }
      return null;
    };

    const footerButtonStyle = (pathName) => {
      if (this.props.location.pathname === pathName) {
        return "footer-button__active";
      }
      return "footer-button";
    };

    const renderedCard = () => {
      if (this.state.todoList.length) {
        const todoProps = {
          isEdit: this.state.isEdit,
          isHovered: this.state.isHovered,
          editTodoId: this.state.editTodoId,
          editedTodo: this.state.editedTodo,
          updateTodo: this.updateTodo,
          deleteSingleTodo: this.deleteSingleTodo,
          handleCheck: this.handleCheck,
          handleEditOnChange: this.handleEditOnChange,
          handleMouseEnter: this.handleMouseEnter,
          handleMouseLeave: this.handleMouseLeave,
          handleDoubleClick: this.handleDoubleClick,
        };

        const todoList = this.state.todoList.slice();
        const activeTodoList = todoList.filter((item) => !item.isCompleted);
        const completedTodoList = todoList.filter((item) => item.isCompleted);

        return (
          <div className="layout">
            <Card className="card-panel">
              <DownOutlined className="down-icon" />
              <Input
                className="text-input"
                placeholder="What needs to be done?"
                name="todo"
                onChange={this.handleOnChange}
                onPressEnter={this.createTodo}
                value={this.state.todo}
              />
              <Switch>
                <Route
                  path="/active"
                  render={(props) => (
                    <Activetodos
                      {...props}
                      {...todoProps}
                      todoList={activeTodoList}
                    />
                  )}
                />
                <Route
                  path="/completed"
                  render={(props) => (
                    <Completetodos
                      {...props}
                      {...todoProps}
                      todoList={completedTodoList}
                    />
                  )}
                />
                <Route
                  path="/"
                  render={(props) => (
                    <Todos
                      {...props}
                      {...todoProps}
                      todoList={this.state.todoList}
                    />
                  )}
                />
              </Switch>
              <Divider className="divider" />
              <div className="card-footer">
                <div className="card-footer__first">{itemLeft()}</div>
                <div className="card-footer__second">
                  <Button
                    type="text"
                    size="small"
                    className={footerButtonStyle("/")}
                  >
                    <Link to="/">All</Link>
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    className={footerButtonStyle("/active")}
                  >
                    <Link to="/active">Active</Link>
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    className={footerButtonStyle("/completed")}
                  >
                    <Link to="/completed">Completed</Link>
                  </Button>
                </div>
                <div className="card-footer__third">
                  {renderClearCompleted()}
                </div>
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
              placeholder="What needs to be done?"
              name="todo"
              onChange={this.handleOnChange}
              onPressEnter={this.createTodo}
              value={this.state.todo}
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
  }
}

export default withRouter(App);
