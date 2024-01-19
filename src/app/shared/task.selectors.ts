import { createSelector } from '@ngrx/store';
import { AppState } from './task.reducer';

export const selectTasks = (state: AppState) => state.tasks;

export const selectTaskById = (id: number) =>
  createSelector(selectTasks, tasks => tasks.find(task => task.iContactId === id));
