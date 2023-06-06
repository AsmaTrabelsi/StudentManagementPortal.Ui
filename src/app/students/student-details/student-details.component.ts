import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Models/ui-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentId : string | null | undefined;
  student :Student={
    id: '',
    firstName:'',
    lastName:'',
    dateofBirth:'',
    email:'',
    mobile:0,
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id:'',
      physicalAddress:'',
      postalAddress: ''
    },
  }
  constructor(private readonly studentService :StudentService, private readonly actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe(
      (params)=>{
        this.studentId=  params.get('id')
        if(this.studentId){
          this.studentService.getStudent(this.studentId).subscribe(
            (successResponse)=>{
                this.student = successResponse;
            },

          );
        }
      },

    )


  }

}