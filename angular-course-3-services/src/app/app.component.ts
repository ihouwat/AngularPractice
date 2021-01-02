import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {CoursesService} from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]> // Observable variable

  // courses;

  constructor(private coursesService: CoursesService) {

  }

  ngOnInit() {

    // // Setting HTTP parameters
    // const params = new HttpParams()
    //   .set("page", "1")
    //   .set("pageSize", "10");

    // FIRST METHOD:  GET request - manual subscription method
    // this.http.get('/api/courses', {params})
    //   .subscribe( // manual subscription to observable
    //     courses => this.courses = courses
    //   );

    // SECOND METHOD: GET request - using async pipe
    // this.courses$ = this.http.get<Course[]>('/api/courses', {params})
  
    // THIRD METHOD: GET request - dependency injection
    this.courses$ = this.coursesService.loadCourses();
  
  }

  save(course:Course) {
    this.coursesService.saveCourse(course)
      .subscribe(
        () => console.log('Course saved!')
      );
  }

}
