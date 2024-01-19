import { act } from '@ngrx/effects';
import { Contact } from './models/contact-model';
import { deleteTask, setTask } from './task.actions';

export interface AppState {
  tasks: Contact[];
}

export const initialState: AppState = {
  tasks: []
};

export function taskReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case deleteTask.type:
      debugger;
      return { ...state, tasks: state.tasks.filter(task => task.iContactId !== action.id) };
    case setTask.type:
      debugger;
      return { ...state, tasks: action };
    default:
      return state;
  }
}
