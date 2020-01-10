import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

    constructor(http: HttpClient,
        httUrlGenerator: HttpUrlGenerator) {
            super('Course', http, httUrlGenerator);
        }

    getAll(): Observable<Course[]> {
        return this.http.get('/api/courses').pipe(
            map(res => res['payload'])
        );
    }
}
