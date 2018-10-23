import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/api/videos.service';
import { NGXLogger } from 'ngx-logger';

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
    private logger: NGXLogger) { }

  ngOnInit() {
    this.videosService.fetchVideos().subscribe((res: any) => {
      console.log(res);
      this.logger.info(res);
      this.total = res.total;
      this.videos = res.videos;
      this.showBoundaryLinks = true;
      this.itemsPerPage = this.videos.length;
      this.currentPage = 1;
      console.log(this.videos[0])
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
