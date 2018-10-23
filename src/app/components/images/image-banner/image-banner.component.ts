import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from 'src/app/api/images.service';
import { Location } from '@angular/common';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss']
})
export class ImageBannerComponent implements OnInit {
  imageInfo: any = {};
  index: number;
  images: any[] = [];
  comment: any;
  comments: any[] = [];
  isSelected: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private imagesService: ImagesService) { }

  ngOnInit() {

    this.activatedRoute.params.map(params => params.id)
      .subscribe(id => {
        this.fetchImg(id);
        this.getIndex(id);
      })
    // .mergeMap(id => {
    //   return this.imagesService.fetchImageById(id);
    // }).subscribe((res: any) => {
    //   this.imageInfo = res;
    // });


    //console.log(images.indexOf(this.imageInfo));
    // this.activatedRoute.params.map(param => param.id)
    //   .subscribe(id => {

    //     console.log(this.index);
    //   });

  }

  getIndex(id) {
    this.images = JSON.parse(localStorage.getItem('images'));
    let img = this.images.find(d => d._id === id);
    //console.log(img);
    this.index = this.images.indexOf(img);
  }

  fetchImg(id) {
    return this.imagesService.fetchImageById(id).subscribe((res: any) => {
      this.imageInfo = res;
    })
  }

  closeBanner() {
    //this.location.go('/images');
    this.router.navigate(['images']);
  }

  preImg() {
    this.index--;
    const img = this.images[this.index];
    this.fetchImg(img._id);
  }

  nextImg() {
    this.index++;
    const img = this.images[this.index];
    this.fetchImg(img._id);
  }

  collect() {
    this.isSelected = !this.isSelected;
    this.isSelected
      ? this.imageInfo.collections_count++
      : this.imageInfo.collections_count--;
  }

  postComment(event: any) {
    console.log(event);

  }
}
