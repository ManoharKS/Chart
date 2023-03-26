import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ChartType, Chart } from "chart.js";

@Component({
  selector: "doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.scss"],
})
export class DoughnutChartComponent {
  chart: any;
  valueInp: any = 70;
  @ViewChild("dChart", { static: false }) dChart: ElementRef;
  @Input() jsonArray: any;
  @Input() chartLabels: any;
  @Input() backgroundColors: any;

  ngAfterViewInit() {
    let cvs: any;
    cvs = this.dChart.nativeElement;
    this.chart = new Chart(cvs, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: this.jsonArray,
            backgroundColor: this.backgroundColors,
            fill: false,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        legend: {
          display: false,
        },
        cutout: 60,
        tooltips: {
          enabled: true,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        elements: {
          center: {
            text: "percentage",
            fontColor: "#000000",
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontStyle: "normal",
            fontWeight: "bolder",
            minFontSize: 7,
            maxFontSize: 11,
            percentageValue: this.jsonArray.reduce((acc: any, ele: any) => acc + ele, 0),
          },
        },
      },
      plugins: [
        {
          id: "centerText",
          afterDraw: function (chart: any) {
            const centerConfig = chart.config.options.elements.center;
            const ctx = chart.ctx;
            ctx.save();
            ctx.font =
              'bold 45px "Helvetica Neue", Helvetica, Arial, sans-serif';
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = chart.chartArea.top + chart.chartArea.bottom / 1.7;

            let percentagefontSize = 12;
            let totalfontSize = 15;
            ctx.fillText(
              centerConfig.percentageValue,
              centerX,
              (centerY -
                percentagefontSize / 2 +
                (centerY + percentagefontSize) / 2) /
              2
            );
            ctx.font =
              '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
            var text = "Test performed on device";
            var words = text.split(" ");
            var line = "";

            for (var n = 0; n < words.length; n++) {
              var testLine = line + words[n] + " ";
              var metrics = ctx.measureText(testLine);
              var testWidth = metrics.width;
              if (testWidth > 100 && n > 0) {
                ctx.fillText(line, centerX, centerY + totalfontSize / 2);
                line = words[n] + " ";
                centerY += 15;
              } else {
                line = testLine;
              }
            }
            ctx.fillText(line, centerX, centerY + totalfontSize / 2);

            ctx.restore();
          },
        },
      ],
    } as any);
  }
}
