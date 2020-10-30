import React, { Component } from "react";
import { Card, Input, List } from "antd";
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  state = {
    todo: "",
    editedTodo: "",
    todoList: [],
    isEdit: false,
    editTodoIndex: null,
  };

  createTodo = (e) => {
    e.preventDefault();
    this.setState({
      todoList: [...this.state.todoList, this.state.todo],
      todo: "",
    });
  };

  updateTodo = (e) => {
    e.preventDefault();
    const todoList = this.state.todoList.slice();
    todoList.splice(this.editTodoIndex, 1, this.state.editedTodo);
    const stateObj = {
      todoList,
      editTodoIndex: null,
      editedTodo: "",
      isEdit: false,
    };
    this.setState(stateObj);
  };

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ todo: e.target.value });
  };

  handleEditOnChange = (e) => {
    e.preventDefault();
    this.setState({ editedTodo: e.target.value });
  };

  handleDoubleClick = (index) => {
    console.log(index);
    this.setState({
      isEdit: true,
      editTodoIndex: index,
      editedTodo: this.state.todoList[index],
    });
  };

  render() {
    const renderedElement = () => {
      if (this.state.isEdit) {
        return (
          <Input
            className="text-input__edit"
            name="editTodo"
            onChange={this.handleEditOnChange}
            onPressEnter={this.updateTodo}
            value={this.state.editedTodo}
          />
        );
      }
      return (
        <List
          itemLayout="horizontal"
          dataSource={this.state.todoList}
          renderItem={(item, index) => (
            <List.Item
              className="list-item"
              onDoubleClick={(e) => {
                e.preventDefault();
                this.handleDoubleClick(index);
              }}
            >
              <span>{item}</span>
            </List.Item>
          )}
        />
      );
    };

    return (
      <div className="App">
        <div className="app-title__box">
          <span className="app-title">todos</span>
        </div>
        <div className="layout">
          <Input
            className="text-input"
            placeholder="What needs to be done?"
            name="todo"
            onChange={this.handleOnChange}
            onPressEnter={this.createTodo}
            value={this.state.todo}
          />
          {!!this.state.todoList.length && (
            <Card className="card-panel">{renderedElement()}</Card>
          )}
        </div>
      </div>
    );
  }
}

export default App;
