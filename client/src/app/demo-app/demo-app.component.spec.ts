import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { DemoAppComponent } from './demo-app.component';

describe('DemoAppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoAppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render weather rows from API', () => {
    const fixture = TestBed.createComponent(DemoAppComponent);
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/weatherforecast`);
    req.flush([
      {
        date: '2026-01-01',
        temperatureC: 21,
        temperatureF: 69,
        summary: 'Warm'
      }
    ]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const row = compiled.querySelector('tbody tr');

    expect(row).not.toBeNull();
    expect(row?.textContent).toContain('Warm');
  });
});
