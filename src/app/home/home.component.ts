import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';  
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle
} from "ng-apexcharts";
@Component({
  selector: 'app-home',
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalAnalyzedTexts: number = 0;
  averageSentimentScore: number = 0;
  sentimentDistribution: { Sentiment: string, count: number }[] = [];
  constructor(private api : ApiService){

  }
  
  ngOnInit(){
    this.api.getTotalAnalyzedTexts().subscribe(res => {
      this.totalAnalyzedTexts = res.totalAnalyzedTexts;
      this.averageSentimentScore = res.averageSentimentScore;
      this.sentimentDistribution = res.sentimentDistribution;
    })

    this.api.getTotalAnalyzedTexts().subscribe({
      next: (res) => {
        this.totalAnalyzedTexts = res.totalAnalyzedTexts;
        this.averageSentimentScore = res.averageSentimentScore;
        this.sentimentDistribution = res.sentimentDistribution;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

}
