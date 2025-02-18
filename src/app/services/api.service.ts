import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  sendTextToAnalyze(text : string) : Observable<any>{
    return this.http.post('http://localhost:3000/analyze', { text })
  }

  getTotalAnalyzedTexts() : Observable<any>{
    return this.http.get('http://localhost:3000/getTotalAnalyzedTexts')
  }
}
