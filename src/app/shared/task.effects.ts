import { contactActionTypes } from './task.actions';
import { contactService } from './services/contact-service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ContactEffects {

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActionTypes.deleteTask),
      concatMap((action: any) => this.courseService.deletecontact(action.id))
    ),
    { dispatch: false }
  );
  constructor(private courseService: contactService, private actions$: Actions, private router: Router) { }
}
