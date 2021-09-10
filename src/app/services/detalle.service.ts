import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MdlDetalle } from '../models/MdlDetalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  
  appUrl='http://localhost:14695/';
  apiUrl='api/detalles/'
  apiUrl1='api/facturaDetalles/'
  list!: MdlDetalle[];

  private detalleBehaivor = new BehaviorSubject<MdlDetalle>({} as any);

  constructor(private http: HttpClient) { }

  
  createDetalle(detalle: MdlDetalle): Observable<MdlDetalle> {
    console.log('detalle post .'+detalle.linea+','+detalle.id+','+detalle.producto+','+detalle.cantidad+','+detalle.monto+','+detalle.monto_total);
    return this.http.post<MdlDetalle>(this.appUrl+this.apiUrl, detalle);
  }

  updateDetalle(id:number, detalle: MdlDetalle): Observable<MdlDetalle> {
    console.log('detalle PUT .'+detalle.linea+','+detalle.id+','+detalle.producto+','+detalle.cantidad+','+detalle.monto+','+detalle.monto_total);
    return this.http.put<MdlDetalle>(this.appUrl+this.apiUrl+id, detalle);
  }

  getDetalles(idFactura: number ){
    this.http.get(this.appUrl+this.apiUrl1+idFactura).toPromise()
    .then(
      data =>{
          this.list =data as MdlDetalle[];
      }
    );
  }

  deleteDetalle(id: number) : Observable<MdlDetalle> {

    return this.http.delete<MdlDetalle>(this.appUrl + this.apiUrl + id);
  }

  update(detalle:any) {
    this.detalleBehaivor.next(detalle);
  }

  getDetalle(): Observable<MdlDetalle> {
    return this.detalleBehaivor.asObservable();
  }
}
