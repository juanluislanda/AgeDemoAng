import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MdlFactura } from '../models/MdlFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  appUrl='http://localhost:14695/';
  apiUrl='api/facturas/'
  list!: MdlFactura[];

  private facturaBehaivor = new BehaviorSubject<MdlFactura>({} as any);

  constructor(private http: HttpClient) { }

  
  
  saveFactura(factura: MdlFactura): Observable<MdlFactura> {
    return this.http.post<MdlFactura>(this.appUrl+this.apiUrl, factura);
  }

  updateFactura(id:number, factura: MdlFactura): Observable<MdlFactura> {
    return this.http.put<MdlFactura>(this.appUrl+this.apiUrl+id, factura);
  }

  getFacturas(){
    this.http.get(this.appUrl+this.apiUrl).toPromise()
    .then(
      data =>{
          this.list =data as MdlFactura[];
      }
    );
  }

  deleteFactura(id: number) : Observable<MdlFactura> {

    return this.http.delete<MdlFactura>(this.appUrl + this.apiUrl + id);
  }

  update(factura1:any) {
    this.facturaBehaivor.next(factura1);
  }

  getFactura(): Observable<MdlFactura> {
    return this.facturaBehaivor.asObservable();
  }
}
