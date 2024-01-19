import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContactComponent } from './pages/contacts/contact-list.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SharedModule } from './shared/shared.module';
import { AddEditContactComponent } from './pages/contacts/addEdit-contact.component';
import { HttpInteceptorService } from './shared/services/http-interceptor-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContactEffects } from '../app/shared/task.effects';
import { taskReducer } from '../app/shared/task.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AddEditContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(taskReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInteceptorService,
      multi: true,
      
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
