import { Component, OnInit, Renderer2 } from '@angular/core';
import { ImagesService } from 'src/app/api/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  fetchCount: number = 1;
  images: any[] = [];
  constructor(private imagesService: ImagesService,
    private render: Renderer2) {
    this.render.listen('window', 'scroll', (e) => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop + window.innerHeight > document.body.clientHeight - 50 &&
        this.fetchCount >= 2) {
        this.fetchMore(e);
      }
    });
  }

  ngOnInit() {
    this.getImages();
  }

  fetchMore(event: any) {
    event.preventDefault();
    this.fetchCount++;
    this.imagesService.fetchImages(this.fetchCount)
      .subscribe((res: any) => {
        this.images = res;
        localStorage.setItem('images',JSON.stringify(this.images));
      })
  }

  private getImages() {
    this.imagesService.fetchImages(this.fetchCount)
      .subscribe((res: any) => {
        console.log(res);
        this.images = res;
        localStorage.setItem('images', JSON.stringify(this.images));
      })
  }



}
