import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()

export class SearchService {
  host = environment.host;

  constructor(
    private http: HttpClient
  ) {}

  search() {
    const params = new HttpParams({ fromString: window.location.hash.substr(1) });
    return this.http.get(this.host + 'search', { params });
  }
}
