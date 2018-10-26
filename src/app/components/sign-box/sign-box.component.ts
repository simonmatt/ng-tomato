import { Component, OnInit, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UsersService } from 'src/app/api/users.service';

@Component({
  selector: 'app-sign-box',
  templateUrl: './sign-box.component.html',
  styleUrls: ['./sign-box.component.css']
})
export class SignBoxComponent implements OnInit {
  title: string;
  closeBtnName: string;
  signType: string;
  username: string;
  password: string;
  constructor(private bsModalRef: BsModalRef,
    private usersService: UsersService) { }

  ngOnInit() {
    this.signType = 'signin';
  }

  switchSign(event: any) {
    event.preventDefault();
    this.title = this.signType === 'signup' ? 'sign in' : 'sign up';
    this.signType = this.signType === 'signup' ? 'signin' : 'signup';
  }

  sign(event: any) {
    //let username=this.ef.nativeElement.querySelector('#inputUsername');


    this.usersService.signInOrUp(this.username, this.password, this.signType)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem('tomato_token', res.token);
        }
        this.bsModalRef.hide();
      })
  }
}
