import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/api/videos.service';
import {  } from 'ngx-logger';
import { NgxLoggerLevel } from 'ngx-logger/lib/types/logger-level.enum';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  total: number;
  videos: any[] = [];
  page: number;
  showBoundaryLinks: boolean;
  itemsPerPage: number;
  currentPage: number;
  constructor(private videosService: VideosService,
    private logger: NgxLoggerLevel) { }

  ngOnInit() {
    this.videosService.fetchVideos().subscribe((res: any) => {
      console.log(res);
      //this.logger.info(res);
      this.total = res.total;
      this.videos = res.videos;
      this.showBoundaryLinks = true;
      this.itemsPerPage = this.videos.length;
      this.currentPage = 1;
      console.log(this.videos.length)
    })
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.videosService.fetchVideos(this.page).subscribe((res: any) => {

      this.total = res.total;
      this.videos = res.videos;
      this.currentPage = event.page;
    })
  }
}
