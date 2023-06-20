import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HighchartService ,chartModal } from 'src/app/highchart.service';
import * as Highcharts from "highcharts";
import Chart from 'chart.js/auto';
 import { AngularFireModule } from '@angular/fire/compat';
  
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
 
export class StatisticsComponent   {
  chart: any = []
  constructor() {}

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'july', 'august' , 'October', 'November', 'September'],
        datasets: [
          {
            label: 'ACCIDENTS',
            data: [2, 8, 4, 1, 0, 7,1,7,5,9,2,0],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }





  // items$!: chartModal[];
  // Highcharts: typeof Highcharts = Highcharts;
  // chardata: any[] = [];
  // chartOptions: any;
  // constructor(private highchartservice: HighchartService ) {}
  // ngOnInit() {
  //   this.highchartservice.rates$.subscribe((assets) => {
  //     this.items$ = assets;
  //     if (this.items$) {
  //       this.items$.forEach((element) => {
  //         this.chardata.push(element.id);
  //       });
  //       this.getChart();
  //     }
  //   });
  // }
  // getChart() {
  //   this.chartOptions = {
  //     series: [{
        
  //       data: this.chardata
  //     }],
      
  //     chart: {
  //       type: 'column'
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     title: {
  //       text: "accidents",
        
  //     },
    
   
     
  //   };
  // }
}


