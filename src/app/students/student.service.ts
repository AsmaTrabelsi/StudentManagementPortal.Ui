import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/api-models/student.model';
import { UpdatSteStudentRequest } from '../Models/api-models/UpdateStudentRequest.model';

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

  updateStudent(id: string, student : Student):Observable<Student>{

    const updateStudentRequest : UpdatSteStudentRequest= {
      firstName :student.firstName,
      lastName :student.lastName,
      dateofBirth: student.dateofBirth,
      email : student.email,
      mobile: student.mobile,
      genderId: student.genderId,
      physicalAddress: student.address.physicalAddress,
      postalAddress : student.address.postalAddress
    }
    return this.http.put<Student>(this.baseApiUrl+"/Student/" +id,updateStudentRequest);
  }

}
