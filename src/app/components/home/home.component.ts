import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TomatoService } from '../../api/tomato.service';
import { NGXLogger } from 'ngx-logger';

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

  @ViewChild('logoList') logoList: ElementRef;
  @ViewChild('figure') figure: ElementRef;

  constructor(private tomatoService: TomatoService,
    private renderer2: Renderer2,
    private logger:NGXLogger) {

  }

  ngOnInit() {
    this.getRepos();
    this.renderer2.listen('window', 'resize', (e) => {
      //console.log(e);
      this.setHeight();
    });
  }

  getRepos(): void {
    setTimeout(() => {
      this.tecStacks.forEach(ts => {
        this.tomatoService.getRepoStar(ts.user, ts.repo)
          .subscribe((res: any) => {
            //console.log(res);
            //this.logger.info(res);
            ts.star_count = res.stargazers_count;
            //console.log(ts);
          })
      })
    }, 5000);
  }

  more() {
    this.showMore = !this.showMore;

    let logoList$ = this.logoList.nativeElement,
      figure$ = this.logoList.nativeElement;
    const singleHeight = figure$.offsetHeight;
    logoList$.style.height = this.showMore ?
      `${singleHeight * 2}px` : `${singleHeight}px`;
  }

  setHeight():void {
    let logoList$ = this.logoList.nativeElement,
      figure$ = this.logoList.nativeElement;
    const singleHeight = figure$.offsetHeight;
    logoList$.style.height = singleHeight + 'px';
  }

}
