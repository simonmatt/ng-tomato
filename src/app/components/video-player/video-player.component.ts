import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from 'src/app/api/videos.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  playUrl: string = '';
  videoInfo: any = {};
  playIcon: string = 'Ⅱ';
  playend: boolean = false;
  currentTime: number = 0;
  volumeoff: boolean = false;
  volume: number = 0.3;
  currentSpeed: string = '1.0x';
  wordSpeeds: string[] = ["2.0x", "1.5x", "1.0x", "0.5x"];
  selectedSrc: string = 'Standard';
  selectedCol: boolean = false;
  selectedSup: boolean = false;
  loading: boolean = true;

  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('progressBar', { static: true }) progressBar: ElementRef;
  @ViewChild('progress', { static: true }) progress: ElementRef;
  @ViewChild('volumeBar', { static: true }) volumeBar: ElementRef;
  @ViewChild('volumeLevle', { static: true }) volumeLevle: ElementRef;
  constructor(private activatedRoute: ActivatedRoute,
    private videosService: VideosService) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   let id = params.id;
    //   this.videosService.fetchVideoById(id)
    //     .subscribe((video: any) => {
    //       console.log(video)
    //       this.playUrl = video.playUrl;
    //     })
    // });

    this.activatedRoute.params.map(res => res.id)
      .mergeMap(id => {
        console.log(id);
        return this.videosService.fetchVideoById(id);
      }).subscribe((video: any) => {
        console.log(video);
        this.videoInfo = video;
        this.playUrl = video.playUrl;
      })
  }

  canplay() {
    let video = this.video.nativeElement;
    video.volume = 0.3;
    console.log(this.video);
  }

  togglePlay() {
    let video = this.video.nativeElement;
    const method = video.paused ? "play" : "pause";
    const playIcon = video.paused ? "Ⅱ" : "►";
    this.playIcon = playIcon;
    video[method]();
  }

  updateProgress(event: any) {
    let video = this.video.nativeElement,
      progress = this.progress.nativeElement,
      progressBar = this.progressBar.nativeElement;
    const time = event.offsetX / progress.offsetWidth * video.duration;
    const percent = (1 - event.offsetX / progress.offsetWidth) * 100;
    progressBar.style.right = `${percent}`;
    video.currentTime = time;
  }

  updateBar() {
    let video = this.video.nativeElement,
      progressBar = this.progressBar.nativeElement;
    if (video) {
      const percent = (1 - video.currentTime / video.duration) * 100;
      progressBar.style.right = `${percent}`;
      this.playIcon = video.currentTime === video.duration || video.paused ? "►" : "Ⅱ"
      this.currentTime = Math.floor(video.currentTime);
    }
  }

  handleVolume(event: any) {
    this.volumeoff = false;
    let volumeBar$ = this.volumeBar.nativeElement,
      volumeLevle$ = this.volumeLevle.nativeElement,
      video$ = this.video.nativeElement;
    const clientReact = volumeBar$.getBoundingClientRect();
    const diffY = event.clientY - clientReact.botton;
    volumeLevle$.style.height = -diffY + 'px';
    video$.volume = volumeLevle$.offsetHeight / volumeBar$.offsetHeight;
  }

  handleSpeed(rate) {
    let video$ = this.video.nativeElement;
    this.currentSpeed = rate;
    video$.playbackRate = parseFloat(this.currentSpeed);
  }

  switchSrc(src) {
    this.selectedSrc = src;
  }

  handleCollect() {
    this.selectedCol = !this.selectedCol;
  }

  handleSupport() {
    this.selectedSup = !this.selectedSup;
  }

  showReplayButton() {
    this.playend = true;
  }

  volumeOff() {
    let video$ = this.video.nativeElement,
      volumeLevle$ = this.volumeLevle.nativeElement;
    this.volumeoff = true;
    this.volume = video$.volume;
    volumeLevle$.style.height = 0;
    video$.volume = 0;
  }

  volumeOn() {
    let video$ = this.video.nativeElement,
      volumeLevle$ = this.volumeLevle.nativeElement,
      volumeBar$ = this.volumeBar.nativeElement;
    this.volumeoff = false;
    this.volume = video$.volume;
    volumeLevle$.style.height = volumeBar$.offsetHeight * this.volume + 'px';
  }

  replay() {
    let video$ = this.video.nativeElement;
    video$.play();
    this.playend = false;
  }
}
