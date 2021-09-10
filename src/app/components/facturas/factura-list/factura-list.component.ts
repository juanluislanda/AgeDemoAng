import { Component, OnInit } from '@angular/core';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { MdlFactura } from 'src/app/models/MdlFactura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {
 // public listFactura!: MdlFactura[];
  constructor(public facturaService: FacturaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.facturaService.getFacturas();
  
  }

  deleteFactura(factura: MdlFactura){
    if(confirm('Eliminar registro?')){
     
      this.facturaService.deleteFactura(factura.id!).subscribe(data =>{
        this.toastr.warning('Registro Eliminado','Factura eliminada');
          this.facturaService.getFacturas();
      });
    }
  }

  editFactura(factura:MdlFactura){
    this.facturaService.update(factura);
  }

}
