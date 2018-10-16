import { Component, OnInit } from '@angular/core';
import { TomatoService } from '../../api/tomato.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tecStacks = [
    {
      user: "vuejs",
      repo: "vue",
      href: "https://github.com/vuejs/vue",
      url: "../../../assets/img/logo.png",
      star_count: ""
    },
    {
      user: "sass",
      repo: "sass",
      href: "https://github.com/sass/sass",
      url: "../../../assets/img/scss.png",
      star_count: ""
    },
    {
      user: "nodejs",
      repo: "node",
      href: "https://github.com/nodejs/node",
      url: "../../../assets/img/nodepng.png",
      star_count: ""
    },
    {
      user: "mongodb",
      repo: "mongo",
      href: "https://github.com/mongodb/mongo",
      url: "../../../../assets/img/mongodb.png",
      star_count: ""
    },
    {
      user: "webpack",
      repo: "webpack",
      href: "https://github.com/webpack/webpack",
      url: "../../../assets/img/webpack.png",
      star_count: ""
    },
    {
      user: "nginx",
      repo: "nginx",
      href: "https://github.com/nginx/nginx",
      url: "../../../assets/img/nginx.png",
      star_count: ""
    }
  ];

  showMore: boolean = false;
  constructor(private tomatoService: TomatoService) { }

  ngOnInit() {
    this.getRepos();
  }

  getRepos():void{
    setTimeout(() => {
      this.tecStacks.forEach(ts => {
        this.tomatoService.getRepoStar(ts.user, ts.repo)
          .subscribe((res: any) => {
            //console.log(res);
            ts.star_count = res.stargazers_count;
            //console.log(ts);
          })
      })
    }, 5000);
  }

  more() {
    this.showMore = !this.showMore;

  }

}
