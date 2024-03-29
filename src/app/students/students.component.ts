import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../Models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students : Student[]=[];
  filterString ="";
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'mobile',"email","gender","edit"];

  @ViewChild(MatPaginator) matPaginator! : MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  dataSource : MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      (successResponse)=>{
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
        console.log(successResponse);
      },
      (errorResponse)=>{
          console.log(errorResponse);
      }
    );
  }
  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
