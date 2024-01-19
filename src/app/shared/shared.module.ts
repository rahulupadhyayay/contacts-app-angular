import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { TableModule } from "primeng/table";
import { LoaderInterceptorService } from "./services/loader-interceptor.service";
import { DialogModule } from 'primeng/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from './task.reducer';
import { ContactEffects } from './task.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, TableModule, ToastrModule.forRoot(), DialogModule, StoreModule.forFeature('tasks', taskReducer), EffectsModule.forFeature([ContactEffects])],
  exports:[CommonModule, RouterModule,ReactiveFormsModule,FormsModule,TableModule,ToastrModule,DialogModule],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true,
  }],
})
export class SharedModule { }
