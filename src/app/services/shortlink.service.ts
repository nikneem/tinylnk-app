import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IShortLinkDetailsDto,
  IShortLinksListDto,
} from '../state/shortlinkdetails/shortlinkdetails.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShortlinkService {
  private serviceUrl: string = environment.api_base_url;
  constructor(private http: HttpClient) {}

  public list(query?: string): Observable<Array<IShortLinkDetailsDto>> {
    let url = `${this.serviceUrl}/api/shortlinks`;
    if (query) {
      url += `?query=${query}`;
    }
    return this.http.get<Array<IShortLinkDetailsDto>>(url);
  }

  public receive(id: string): Observable<IShortLinkDetailsDto> {
    let url = `${this.serviceUrl}/api/shortlinks/${id}`;
    return this.http.get<IShortLinkDetailsDto>(url);
  }

  public add(endpoint: string): Observable<IShortLinkDetailsDto> {
    let dto = {
      endpoint: endpoint,
    };
    let url = `${this.serviceUrl}/api/shortlinks`;
    return this.http.post<IShortLinkDetailsDto>(url, dto);
  }

  public update(
    id: string,
    dto: IShortLinkDetailsDto
  ): Observable<IShortLinkDetailsDto> {
    let url = `${this.serviceUrl}/api/shortlinks/${id}`;
    return this.http.put<IShortLinkDetailsDto>(url, dto);
  }

  public delete(id: string): Observable<boolean> {
    let url = `${this.serviceUrl}/api/shortlinks/${id}`;
    return this.http.delete<boolean>(url);
  }

  public isUnique(id: string, shortCode: string): Observable<null> {
    let url = `${this.serviceUrl}/api/shortlinks/${id}/${shortCode}`;
    return this.http.get<null>(url);
  }
}
