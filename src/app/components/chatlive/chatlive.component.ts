import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/api/users.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-chatlive',
  templateUrl: './chatlive.component.html',
  styleUrls: ['./chatlive.component.scss']
})
export class ChatliveComponent implements OnInit {
  user: any;
  message: string;
  onlineUsers: any[];
  messages: string[];
  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('tomato_token');
    const headers = new HttpHeaders().set('accesstoken', token);
    this.usersService.fetchSignedUser(headers)
      .subscribe((res: any) => {
        console.log(res);
        this.user = res;
      });
  }

}
