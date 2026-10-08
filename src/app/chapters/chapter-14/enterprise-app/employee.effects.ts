import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EmployeeAdapter } from './employee.adapter';
import {
  loadEmployeeProfile,
  loadEmployeeProfileFailure,
  loadEmployeeProfileSuccess,
} from './employee.actions';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private adapter = new EmployeeAdapter();

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployeeProfile),
      switchMap(({ id }) =>
        this.http.get<any>(`/api/employees/${id}`).pipe(
          map((api) => loadEmployeeProfileSuccess({ profile: this.adapter.adapt(api) })),
          catchError((err) =>
            of(
              loadEmployeeProfileFailure({
                error: `${err?.error?.kind ?? 'unknown'} error (correlation ${err?.correlationId ?? 'n/a'})`,
              })
            )
          )
        )
      )
    )
  );
}
