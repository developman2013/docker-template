import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-demo-app',
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.scss']
})
export class DemoAppComponent {
  public temperatures: Array<WeatherForecastModel> = new Array<WeatherForecastModel>();
  private baseUrl: string = environment['apiBaseUrl'];

  constructor(private http: HttpClient) {
    this.listUpdate();
   }

  public async listUpdate():Promise<void>  {
    this.temperatures = await this.http
      .get<Array<WeatherForecastModel>>(this.baseUrl + '/weatherforecast')
      .toPromise();
  }
}

export class WeatherForecastModel {
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
