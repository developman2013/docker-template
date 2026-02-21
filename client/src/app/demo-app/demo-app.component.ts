import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';

import { WeatherApiService } from '../core/weather-api.service';
import { WeatherForecast } from '../models/weather-forecast.model';

type WeatherViewModel = {
  readonly loading: boolean;
  readonly error: string | null;
  readonly data: WeatherForecast[];
};

@Component({
  selector: 'app-demo-app',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoAppComponent {
  private readonly weatherApi = inject(WeatherApiService);
  private readonly refreshTrigger$ = new Subject<void>();

  readonly vm$: Observable<WeatherViewModel> = this.refreshTrigger$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.weatherApi.getForecasts().pipe(
        map((data) => ({ loading: false, error: null, data })),
        startWith({ loading: true, error: null, data: [] as WeatherForecast[] }),
        catchError(() =>
          of({
            loading: false,
            error: 'Failed to load weather data. Please try again.',
            data: [] as WeatherForecast[]
          })
        )
      )
    )
  );

  refresh(): void {
    this.refreshTrigger$.next();
  }
}
