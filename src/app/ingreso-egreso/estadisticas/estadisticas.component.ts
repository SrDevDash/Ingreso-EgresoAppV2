import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/Models/ingreso-egreso.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;
  ingresoTotal: number = 0;
  egresoTotal: number = 0;

  public doughnutChartLabels: string[] = [ 'Ingreso', 'Egreso' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ this.ingresoTotal, this.egresoTotal ] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe
    ( ({items})  => {
      this.generarEstadisticas(items);
    })
  }

  generarEstadisticas(items: IngresoEgreso[]){
    this.egresoTotal = 0;
    this.ingresoTotal = 0;
    this.egresos = 0;
    this.ingresos = 0;
    for (const item of items) {
      if(item.type === 'Ingreso'){
        this.ingresoTotal += item.monto;
        this.ingresos++;
      }
      else {
        this.egresoTotal += item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data:  [this.ingresoTotal,this.egresoTotal],}]
    };
  }
}
