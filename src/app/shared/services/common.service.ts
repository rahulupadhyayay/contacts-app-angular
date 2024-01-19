
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { ApiInterfaceServices } from './api-interface-service';


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * Observable for show/hide loader
   */
  showHideLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  showHideSideMenu: BehaviorSubject<any> = new BehaviorSubject(null)


  

  constructor(
    private toastr: ToastrService,
    private apiService: ApiInterfaceServices
  ) {}

  /**
   * Show Loader
   */
  showLoader() {
    this.showHideLoader.next(true);
  }

  /**
   * Hide Loader
   */
  hideLoader() {
    this.showHideLoader.next(false);
  }

  public toggle(){
    return this.showHideSideMenu.next(null)
  }
  /**
   * show success toaster
   * @param title -> title for toaster
   * @param message -> message for toaster
   * @param isShowCloseButton -> close button show/hide default true
   */
  showSuccessToaster(title: string, message: string, isShowCloseButton = true) {
    this.toastr.success(message, title, {
      closeButton: isShowCloseButton,
      tapToDismiss: false,
    });
    this.toastr.toastrConfig.preventDuplicates = true;
  }

  /**
   * show error toaster
   * @param title -> title for toaster
   * @param message -> message for toaster
   * @param isShowCloseButton -> close button show/hide default true
   */
  showErrorToaster(title: string, message: string, isShowCloseButton = true) {
    this.toastr.error(message, title, {
      closeButton: isShowCloseButton,
      tapToDismiss: false,
    });
    this.toastr.toastrConfig.preventDuplicates = true;
  }
  showWarningToaster(title: string, message: string, isShowCloseButton = true) {
    this.toastr.warning(message, title, {
      closeButton: isShowCloseButton,
      tapToDismiss: false,
    });
    this.toastr.toastrConfig.preventDuplicates = true;
  }
}
