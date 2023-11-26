import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface PercentageMark{
  good: number,
  percentage_good: number,
  fairly: number,
  percentage_fairly: number,
  medium: number,
  percentage_medium: number,
  bad: number,
  percentage_bad: number
}

@Injectable({
  providedIn: 'root'
})

export class AnnualLearningKindService {
  constructor(private http: HttpClient){}

  getPercentageMark(){
    return this.http.get<PercentageMark>('https://qlsv-mu.vercel.app/api/percentage-mark')
  }
}
