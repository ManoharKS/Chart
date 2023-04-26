import { Component, OnInit, ViewChild } from "@angular/core";
import dataOne from "./dataOne.json";
import dataTwo from "./dataTwo.json";
import dataThree from "./dataThree.json";
import dataFour from "./dataFour.json";
import { DoughnutChartComponent } from "./doughnut-chart/doughnut-chart.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  arrOne: any = dataOne.data[0];
  arrTwo: any = dataTwo.data[0];
  arrThree: any = dataThree.data[0];
  arrFour: any = dataFour.data[0];

  @ViewChild(DoughnutChartComponent) dChartComp: any;

  constructor() {}

  ngOnInit(): void {}

  doughnutCharts: any = [this.arrOne, this.arrTwo, this.arrThree, this.arrFour];
}
