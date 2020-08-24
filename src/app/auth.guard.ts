import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SignBoxComponent } from './components/sign-box/sign-box.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('tomato_token');
    if (token) {
      return true;
    } else {
      this.openSignBox();
      return false;
    }
  }

  openSignBox() {
    const initialState = {
      title: 'Sign In',
      closeBtnName: 'Close'
    }
    this.modalRef = this.modalService.show(SignBoxComponent, { initialState });
    console.log(this.modalRef);
  }
}
