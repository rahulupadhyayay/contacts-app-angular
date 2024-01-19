import { createAction, props } from '@ngrx/store';
import { Contact } from './models/contact-model';

export const deleteTask = createAction('deleteTask', props<{ id: number }>());
export const setTask = createAction('setTask', props<{ contacts: Contact }>());

export const contactActionTypes = {
  deleteTask,
  setTask
};
