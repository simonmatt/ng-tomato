import { Component, OnInit, TemplateRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SignBoxComponent } from './components/sign-box/sign-box.component';
import { UsersService } from './api/users.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'ng-tomato';
  token: string;
  modalRef: BsModalRef;
  items: any[];
  user: any;
  constructor(private modalService: BsModalService,
    private usersService: UsersService,
    private router: Router) {

  }

  ngOnInit() {
    this.token = localStorage.getItem('tomato_token');
    const headers = new HttpHeaders().set('accesstoken', this.token);
    this.usersService.fetchSignedUser(headers)
      .subscribe((res: any) => {
        console.log(res);
        this.user = res;
      });
  }

  ngAfterViewChecked(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.token = localStorage.getItem('tomato_token');
  }

  openModal(template: TemplateRef<any>, e) {
    e.preventDefault();

    this.modalRef = this.modalService.show(template);
  }

  openSignBox(event: any) {
    event.preventDefault();
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'SIGN IN'
    };
    this.modalRef = this.modalService.show(SignBoxComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  signOut(event: any) {
    event.preventDefault();
    this.user = {};
    this.token = '';
    localStorage.removeItem('tomato_token');
    this.router.navigate(['home']);
  }


}
