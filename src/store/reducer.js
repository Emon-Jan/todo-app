import * as actionTypes from "./action";

const initialState = {
  todo: "",
  editedTodo: "",
  todoList: [],
  isEdit: false,
  editTodoId: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TODO:
      return {
        ...state,
        todo: action.todo,
      };
    case actionTypes.CHANGE_EDIT_TODO:
      return {
        ...state,
        editedTodo: action.todo,
      };
    case actionTypes.CREATE_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.todoObj],
        todo: "",
      };
    case actionTypes.EDIT_TODO:
      const { isEdit, editTodoId, editedTodo } = action.editTodoObj;
      return {
        ...state,
        isEdit,
        editTodoId,
        editedTodo,
      };
    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        todoList: action.stateObj.todoList,
        isEdit: action.stateObj.isEdit,
        editTodoId: action.stateObj.editTodoId,
        editedTodo: action.stateObj.editedTodo,
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todoList: action.todoList,
      };
    case actionTypes.CHECK_TODO:
      return {
        ...state,
        todoList: action.todoList,
      };
    case actionTypes.CLEAR_COMPLETE_TODO:
      return {
        ...state,
        todoList: action.todoList,
      };
    default:
      return state;
  }
};

export default reducer;
