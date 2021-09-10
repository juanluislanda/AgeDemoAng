import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { Toast, ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { FacturaComponent } from './components/facturas/factura/factura.component';
import { FacturaListComponent } from './components/facturas/factura-list/factura-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetalleComponent } from './components/facturas/detalle/detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    FacturasComponent,
    FacturaComponent,
    FacturaListComponent,
    FooterComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
