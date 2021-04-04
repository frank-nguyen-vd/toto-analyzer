import { Component, OnInit, Inject, Input } from '@angular/core';
import { Toto } from "app/models/toto.model";
import { Subscription } from 'rxjs/Subscription';
import $ from 'jquery';
import Chart from 'chart.js';

const X = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];

const COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

var dict_seven;
var dict_additional; 
var dict_six; 

var Y_seven = [];
var Y_additional = []; 
var Y_six = []; 


@Component({
  selector: 'app-history-distribution',
  templateUrl: './history-distribution.component.html',
  styleUrls: ['./history-distribution.component.css']
})

export class HistoryDistributionComponent implements OnInit {
  totos: Toto[] = [];
  subscriptionTotos: Subscription;
  constructor( @Inject('TotoService') private TotoService) { }

  ngOnInit() {
    console.log("test");
    this.initChartData();
    this.getTotos();
  }


  getTotos(): void {
    this.TotoService.getTotos()
      .then(totos => {
        this.totos = this.totos.concat(totos);
        //console.log(this.totos);
         this.totos.forEach( function (arrayItem)
         {
             //console.log(arrayItem);
             var additional = arrayItem.additional; 
             Y_seven[additional - 1] ++;
             Y_additional[additional - 1] ++; 
             var major = arrayItem.lucks; 
             major.forEach( function (luck)
             {
               Y_seven[luck - 1] ++;
               Y_six[luck - 1] ++;
             }); 
         }); 

        var Y_seven_color       = this.specifyColor(X, Y_seven, 7);
        var Y_six_color         = this.specifyColor(X, Y_six, 6);
        var Y_additional_color  = this.specifyColor(X, Y_additional, 1); 

        this.drawBarChart($('#myChart'), Y_seven, Y_seven_color);   
        this.drawBarChart($('#myChartAdditional'), Y_additional, Y_additional_color);   
        this.drawBarChart($('#myChartSixNumber'), Y_six, Y_six_color);   
      })
      .catch(err => console.log(err));
  }

  initChartData():void{
    var color = Chart.helpers.color;
    for(var i = 0; i < 50; i++)
    {
      Y_seven[i] = 0 ; 
      Y_additional[i] = 0; 
      Y_six[i] = 0; 
    }
  }

  createDict(X, value){
    var dict = new Array();
    for(var i = 0; i < 49; i++)
    {
      dict[X[i]] = value[i]; 
    }
    //console.log(dict);
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    console.log("Itemds dict");
    return items; 
  }

  specifyColor(X, Y, n){
    var color = Chart.helpers.color;
    var Y_color = []; 
    var items = this.createDict(X, Y);
    //console.log(items);
    var count = 0; 
    for (var key in items) {
      //console.log("key is :" + items[count][0]);
      var index = parseInt(items[count][0]) - 1;
      if(count < n) 
        Y_color[index] = color(COLORS.purple).alpha(0.5).rgbString();
      else if(count >= 49-n) 
        Y_color[index] = color(COLORS.grey).alpha(0.5).rgbString();
      else 
        Y_color[index] = color(COLORS.red).alpha(0.5).rgbString();
      count++; 
    }
    return Y_color; 
  }

  drawBarChart(ctx, datalist, colorlist): void {
    //console.log(ctx);
    var color = Chart.helpers.color;
    var frequency = [];

    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: X,
        datasets: [{
          label: 'HOT Numbers',
          data: datalist,
          backgroundColor: colorlist,
        },
        {
           label: 'GENTLE Numbers',
           //backgroundColor: color(COLORS.purple).alpha(0.5).rgbString(),
           data:[]
        },
        {
           label: 'COOL Numbers',
           //backgroundColor: color(COLORS.grey).alpha(0.5).rgbString(),
           data:[]
        }
        ],
      },
      options: {
        legend: {
          labels: {
            generateLabels: function(chart) {
              var labels = Chart.defaults.global.legend.labels.generateLabels(chart);
              labels[0].fillStyle = color(COLORS.purple).alpha(0.5).rgbString();
              labels[1].fillStyle = color(COLORS.red).alpha(0.5).rgbString();
              labels[2].fillStyle = color(COLORS.grey).alpha(0.5).rgbString();
              return labels;
            }
          }
        }
      }
    });
  }
}
