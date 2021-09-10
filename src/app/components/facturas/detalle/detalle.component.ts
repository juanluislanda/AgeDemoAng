import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MdlDetalle } from 'src/app/models/MdlDetalle';
import { MdlFactura } from 'src/app/models/MdlFactura';
import { DetalleService } from 'src/app/services/detalle.service';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  form: FormGroup ;
  subscription!: Subscription;
  subscriptionF!: Subscription;
  detalle!: MdlDetalle;
  facutra!: MdlFactura;
  idLinea = 0;
  idFactura = 0;

  constructor(private formBuilder: FormBuilder, private detalleService: DetalleService,
    private facturaService: FacturaService,
    private toastr: ToastrService) { 
    this.form = this.formBuilder.group({
      id:0,
      producto: ['',[Validators.required]],
      cantidad: [0,[Validators.required]],
      monto:[0.00,[Validators.required]],
      monto_total:[0.00,[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.subscriptionF =this.facturaService.getFactura().subscribe(
        data =>{
           this.facutra = data;
           this.idFactura = this.facutra.id!;
        }
    );

    this.subscription =this.detalleService.getDetalle().subscribe(
      data =>{        
        
          this.detalle =data;
          this.idLinea = this.detalle.linea!;
          if( this.idLinea != undefined){
          
         
          this.form.patchValue({        
            producto: this.detalle.producto,
            cantidad:    this.detalle.cantidad,
            monto : this.detalle.monto,
            monto_total : this.detalle.monto_total
          });
          
        } else
        this.idLinea =0;
         

      }
    );
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
    this.subscriptionF.unsubscribe();
  }

  saveDetalle(){
    console.log(' save detalle '+this.idLinea+','+this.idFactura);
    if(this.idLinea == 0 )
    this.addDetalle();
    else
    this.updateDetalle();

  }

  updateDetalle(){
    let  monto = this.form.get('monto')!.value;
    let cantidad =this.form.get('cantidad')!.value;
    let monto_total = cantidad * monto;
    const detalle1 : MdlDetalle = {
      linea: this.idLinea,
      id : this.idFactura,
      producto: this.form.get('producto')!.value,
      cantidad: cantidad,
      monto: monto,
      monto_total: monto_total.toString()
    }
    this.detalleService.updateDetalle(this.idLinea,detalle1).subscribe(data => {
      this.toastr.success('Registro actualizado','Detalle actualizado');
      this.facturaService.getFacturas();
      this.detalleService.getDetalles(this.idFactura);
      this.form.reset();
      this.idFactura = 0;
      this.idLinea = 0;
    });

  }

  addDetalle(){
    let  monto = this.form.get('monto')!.value;
    let cantidad =this.form.get('cantidad')!.value;
    let monto_total = cantidad * monto;
    const detalle1 : MdlDetalle = {
      id : this.idFactura,
      producto: this.form.get('producto')!.value,
      cantidad: cantidad,
      monto: monto,
      monto_total: monto_total.toString()
    }
    this.detalleService.createDetalle(detalle1).subscribe(data => {
      this.toastr.success('Registro agregado','Detalle creado');
      this.facturaService.getFacturas();
      this.detalleService.getDetalles(this.idFactura);
      this.form.reset();
    });
  }

}
