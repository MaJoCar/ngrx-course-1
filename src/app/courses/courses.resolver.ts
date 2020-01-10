import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../reducers/index';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';
import { areCorusesLoaded } from './courses.selectors';

@Injectable() 
export class CoursesResolver implements Resolve<any> {

    loading = false;
    
    constructor(private store: Store<AppState>) {

    }
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
            return this.store
            .pipe(
                select(areCorusesLoaded),
                tap(coursesLoaded => {
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),
                first(),
                finalize(() => this.loading = false)
            );
    }
}
