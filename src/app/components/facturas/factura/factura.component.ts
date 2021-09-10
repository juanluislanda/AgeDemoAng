import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MdlDetalle } from 'src/app/models/MdlDetalle';
import { MdlFactura } from 'src/app/models/MdlFactura';
import { DetalleService } from 'src/app/services/detalle.service';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})

export class FacturaComponent implements OnInit, OnDestroy {
  form: FormGroup ;
  subscription!: Subscription;
  factura!: MdlFactura;
  idFactura = 0;

  constructor(private formBuilder: FormBuilder, private facturaService: FacturaService,
    private toastr: ToastrService, public detalleService: DetalleService) { 
    this.form = this.formBuilder.group({
      id:0,
      nombre: ['',[Validators.required]],
      nit: ['',[Validators.required]],
      fecha:['',[Validators.required,Validators.maxLength(12),Validators.minLength(10)]],
      correlativo:['',[Validators.required]],
      monto: 0
    })
  }

  ngOnInit(): void {
    this.subscription =this.facturaService.getFactura().subscribe(
      data =>{        
        
          this.factura =data;
          this.idFactura = this.factura.id!;
          if( this.idFactura != undefined){
          
          this.detalleService.getDetalles(this.idFactura);
         
          this.form.patchValue({        
            nombre: this.factura.nombre,
            nit:    this.factura.nit,
            correlativo : this.factura.correlativo,
            fecha : this.factura.fecha,
            monto : this.factura.monto
          });
          
        } else 
           this.idFactura = 0;
         

      }
    );
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
    this.form.reset();
    this.idFactura =0 ;

  }

  saveFactura(){
    if(this.idFactura == 0 )
    this.addFactura();
    else
    this.updateFactura();

  }

  updateFactura(){
    const factura1 : MdlFactura = {
      id : this.idFactura,
      nombre: this.form.get('nombre')!.value,
      nit: this.form.get('nit')!.value,
      fecha: this.form.get('fecha')!.value,
      correlativo: this.form.get('correlativo')!.value
    }
    this.facturaService.updateFactura(this.idFactura,factura1).subscribe(data => {
      this.toastr.success('Registro actualizado','Factura actualizada');
      this.facturaService.getFacturas();
      this.form.reset();
      this.idFactura = 0;
      this.detalleService.getDetalles(0);
    });

  }

  addFactura(){
    const factura1 : MdlFactura = {
      nombre: this.form.get('nombre')!.value,
      nit: this.form.get('nit')!.value,
      fecha: this.form.get('fecha')!.value,
      correlativo: this.form.get('correlativo')!.value
    }
    this.facturaService.saveFactura(factura1).subscribe(data => {
      this.toastr.success('Registro agregado','Factura creada');
      this.facturaService.getFacturas();
      this.form.reset();
      this.idFactura = 0;
      this.detalleService.getDetalles(0);
    });
  }

  deleteDetalle(detalle: MdlDetalle){
    if(confirm('Eliminar registro?')){
     
      this.detalleService.deleteDetalle(detalle.linea!).subscribe(data =>{
        this.toastr.warning('Registro Eliminado','Factura eliminada');
          this.facturaService.getFacturas();
      });
    }
  }

  editDetalle(detalle:MdlDetalle){
    this.detalleService.update(detalle);
  }

}
