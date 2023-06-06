import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Gender } from '../Models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl='https://localhost:7015';
  constructor(private http: HttpClient) { }

  getAllGenders():Observable<Gender[]>{
    return this.http.get<Gender[]>(this.baseApiUrl + "/genders");
  }
}
