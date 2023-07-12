import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface StudentGenderPercentage{
  male: number,
  percentage_male: number,
  female: number,
  percentage_female: number,
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class StudentGenderService {
  constructor(private http: HttpClient){}

  getStudentGender(){
    return this.http.get<StudentGenderPercentage>('https://qlsv-mu.vercel.app/api/percentage-student')
  }
}
