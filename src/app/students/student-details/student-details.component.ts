import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

  genderList : Gender[] = [];
  studentId : string | null | undefined;
  isNewStudent = false;
  header ='';
  student :Student={
    id: '',
    firstName:'',
    lastName:'',
    dateofBirth:'',
    email:'',
    mobile:0,
    genderId:'',
    profileImageUrl: 'image.jpg',
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
     private snackbar: MatSnackBar,
     private router: Router) { }

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe(
      (params)=>{
        this.studentId=  params.get('id')
        if(this.studentId){

          if(this.studentId.toLowerCase()==='Add'.toLocaleLowerCase()){
              this.isNewStudent= true;
              this.header="Add New Student";
          }else{
              this.isNewStudent=false;
              this.header="Update Student";
              this.studentService.getStudent(this.studentId).subscribe(
                (successResponse)=>{
                    this.student = successResponse;
                },

              );


          }

          this.genderService.getAllGenders().subscribe(
            (successResponse)=>{
              console.log(successResponse);
                this.genderList = successResponse;
            },
            (errorResponse)=>{
              console.log(errorResponse);
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
  onDelete(): void {
    this.studentService.deleteStudent(this.student.id)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student deleted successfully', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router.navigateByUrl('students');
          }, 2000);
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  onAdd(): void {
    if (this.studentDetailsForm?.form.valid) {
      this.studentService.addStudent(this.student)
        .subscribe(
          (successResponse) => {
            this.snackbar.open('Student added successfully', undefined, {
              duration: 2000
            });

            setTimeout(() => {
              this.router.navigateByUrl(`students/${successResponse.id}`);
            }, 2000);

          },
          (errorResponse) => {
            console.log(errorResponse);
          }
        );
    }
  }

}
