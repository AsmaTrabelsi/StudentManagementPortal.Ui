import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddStudentRequest } from '../Models/api-models/add-student-request.model';
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

  deleteStudent(studentId: string): Observable<Student> {
    return this.http.delete<Student>(this.baseApiUrl + '/Student/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateofBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.http.post<Student>(this.baseApiUrl + '/Student/Add', addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file);

    return this.http.post(this.baseApiUrl + '/Student/' + studentId + '/upload-image',
      formData, {
      responseType: 'text'
    }
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }

}
