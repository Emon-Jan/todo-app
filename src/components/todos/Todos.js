import React, { Component } from "react";
import TodoList from "../todo-list/TodoList";

export default class Todos extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return <TodoList {...this.props}></TodoList>;
  }
}
