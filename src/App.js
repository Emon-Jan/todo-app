import React, { Component } from "react";
import { Card, Input, List, Divider, Checkbox } from "antd";
import Icon, { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";
import Close from "./icons/CloseIcon";
import CheckedCircleIcon from "./icons/CheckedCircleIcon";
import UnCheckedCircleIcon from "./icons/UncheckedCircleIcon";
import uuid from "react-uuid";

class App extends Component {
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

  render() {
    const checkbox = (item) => {
      if (item.isCompleted) {
        return (
          <Icon
            component={CheckedCircleIcon}
            className="check-icon"
            onClick={() => this.handleCheck(item)}
          />
        );
      }
      return (
        <Icon
          component={UnCheckedCircleIcon}
          className="check-icon"
          onClick={() => this.handleCheck(item)}
        />
      );
    };

    const todoEditableList = (item, index) => {
      if (this.state.isEdit && item.id === this.state.editTodoId) {
        return (
          <Input
            className="text-input__edit"
            autoFocus={true}
            name="editTodo"
            onChange={this.handleEditOnChange}
            onPressEnter={this.updateTodo}
            onClick={this.updateTodo}
            value={this.state.editedTodo}
          />
        );
      }
      return (
        <div
          onMouseEnter={() => {
            this.setState((prevState) => {
              return { isHovered: { ...prevState.isHovered, [index]: true } };
            });
          }}
          onMouseLeave={() => {
            this.setState((prevState) => {
              return { isHovered: { ...prevState.isHovered, [index]: false } };
            });
          }}
        >
          {checkbox(item)}
          <span className={item.isCompleted ? "check-text" : ""}>
            {item.todo}
            {this.state.isHovered[index] && (
              <Icon
                component={Close}
                className="close-icon"
                onClick={() => this.deleteSingleTodo(item)}
              />
            )}
          </span>
        </div>
      );
    };

    const renderedElement = () => {
      return this.state.todoList.map((item, index) => (
        <div key={index}>
          <Divider className="divider" />
          <List
            itemLayout="horizontal"
            className="list-item"
            onDoubleClick={(e) => {
              e.preventDefault();
              this.handleDoubleClick(item.id);
            }}
          >
            {todoEditableList(item, index)}
          </List>
        </div>
      ));
    };

    const itemLeft = () => {
      return this.state.todoList.filter((item) => !item.isCompleted).length;
    };

    const renderedCard = () => {
      if (this.state.todoList.length) {
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
              {renderedElement()}
              <Divider className="divider" />
              <div className="card-footer">
                <div>{`${itemLeft()} items left`}</div>
                <div>h1</div>
                <div>h3</div>
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

export default App;
