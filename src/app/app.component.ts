import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'epons-measurement-tool-accreditation',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private baseUri: string = 'http://api.sadfm.co.za';
  // private baseUri: string = 'http://localhost:4484';

  public results: any[] = [];

  public sortColumn: any = {
    name: 'CountdownInDays',
    direction: 'ASC',
  };

  constructor(private http: Http) {

  }

  public ngOnInit(): void {
    this.load();
  }


  public onClick_Sort(column: string): void {

    let direction: string = 'ASC';

    if (this.sortColumn.name === column && this.sortColumn.direction === 'ASC') {
      direction = 'DESC';
    }

    this.sortColumn = {
      name: column,
      direction,
    };

    this.results = this.results.sort((a, b) => {
      if (direction === 'ASC') {
        return ((
          (typeof (a[column]) === 'string' ? a[column].toLowerCase() : a[column]) <
          (typeof (b[column]) === 'string' ? b[column].toLowerCase() : b[column])
        ) ? -1 : ((
          (typeof (a[column]) === 'string' ? a[column].toLowerCase() : a[column]) >
          (typeof (b[column]) === 'string' ? b[column].toLowerCase() : b[column])
        ) ? 1 : 0));
      } else {
        return ((
          (typeof (a[column]) === 'string' ? a[column].toLowerCase() : a[column]) <
          (typeof (b[column]) === 'string' ? b[column].toLowerCase() : b[column])
        ) ? 1 : ((
          (typeof (a[column]) === 'string' ? a[column].toLowerCase() : a[column]) >
          (typeof (b[column]) === 'string' ? b[column].toLowerCase() : b[column])
        ) ? -1 : 0));
      }
    });
  }

  private load(): void {

    this.get(`/api/MeasurementToolAccreditation/List`).map((x) => {
      const json: any = x.json();
      return json;
    }).subscribe((json) => {
      this.results = json;
    });
  }


  protected post(uri: string, obj: any): Observable<Response> {
    const headers = new Headers();
    headers.append('apikey', '2c0d64c1-d002-45f2-9dc4-784c24e996');

    const jwtToken = localStorage.getItem('jwt.token');

    if (jwtToken !== null || jwtToken === '') {
      headers.append('Authorization', 'Bearer ' + jwtToken);
    }

    return this.http.post(`${this.baseUri}${uri}`, obj, {
      headers,
    });
  }

  protected get(uri: string): Observable<Response> {
    const headers = new Headers();
    headers.append('apikey', '2c0d64c1-d002-45f2-9dc4-784c24e996');

    const jwtToken = localStorage.getItem('jwt.token');

    if (jwtToken !== null || jwtToken === '') {
      headers.append('Authorization', 'Bearer ' + jwtToken);
    }

    return this.http.get(`${this.baseUri}${uri}`, {
      headers,
    });
  }
}
