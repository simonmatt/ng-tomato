import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from 'src/app/api/videos.service';

@Component({
  selector: 'app-single-media-player',
  templateUrl: './single-media-player.component.html',
  styleUrls: ['./single-media-player.component.scss']
})
export class SingleMediaPlayerComponent implements OnInit {
  playUrl: string;
  constructor(private activatedRoute: ActivatedRoute,
    private videosService: VideosService) { }

  ngOnInit() {
    this.activatedRoute.params.map(param => param.id)
      .mergeMap(id => {
        return this.videosService.fetchVideoById(id);
      }).subscribe((video: any) => {
        console.log(video);
        this.playUrl = video.playUrl;
      })
  }

}
