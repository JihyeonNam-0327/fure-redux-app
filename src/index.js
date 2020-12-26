import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';

const initialState = {
  task: '',
  tasks: []
}

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_TASK' :
      return {
        ...state,
        task: action.payload.task
      };
    case 'ADD_TASK' :
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    default :
      return state;
  }
}

const store = createStore(tasksReducer);

// ActionCreator ver.1
// const inputTask = (task) => ({
//   type: 'INPUT_TASK',
//   payload: {
//     task
//   }
// });

// ActionCreator ver.2
const inputTask = (task) => {
  return {
    type: 'INPUT_TASK',
    payload: {
      task
    }
  }
}

const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    payload: {
      task
    }
  }
}

function handleChange(e) {
  console.log('handle : ', e.target.value);
  store.dispatch(inputTask(e.target.value));
};

function handleClick() {
  const state = store.getState();
  store.dispatch(addTask(state.task))
}

function TodoApp({ store }) {
  const state = store.getState();
  return (
    <div>
      <input type="text" onChange={handleChange}></input>
      <input type="button" value="add" onClick={handleClick}></input>
      <ul>
        {
          state.tasks.map((item, index) => {
            return (
              <li key={index}>
                {item}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

function renderApp(store) {
  ReactDOM.render(
    <TodoApp store={store} />,
    document.getElementById('root')
  )
};

store.subscribe(() => renderApp(store));
renderApp(store);
