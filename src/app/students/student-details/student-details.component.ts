import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/Models/api-models/gender.model';
import { Student } from 'src/app/Models/api-models/student.model';
import { GenderService } from 'src/app/Services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  genderList : Gender[] = [];
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
  constructor(private readonly studentService :StudentService,
     private readonly actRouter: ActivatedRoute,
     private readonly genderService: GenderService,
     private snackbar: MatSnackBar) { }

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
          this.genderService.getAllGenders().subscribe(
            (successResponse)=>{
                this.genderList = successResponse;
            }
          );
        }
      },

    )


  }

  onUpdate(): void{
    this.studentService.updateStudent(this.student.id,this.student).
    subscribe(
      (successResponse)=>{
        this.snackbar.open("Student Updated successfully",undefined,{
          duration: 2000
        });

      },
      (errorResponse)=>{
        this.snackbar.open("Cannot Update Student",undefined,{
          duration: 2000
        });
      }

    )
  }

}
