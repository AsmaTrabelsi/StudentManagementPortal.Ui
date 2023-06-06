import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl='https://localhost:7015';
  constructor(private http: HttpClient) { }

  getAllStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseApiUrl + "/Student");
  }

  getStudent(studentId: string):Observable<Student>{
    return this.http.get<Student>(this.baseApiUrl+"/Student/" +studentId);
  }

}
