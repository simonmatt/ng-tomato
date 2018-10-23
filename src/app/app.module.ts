import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VideosComponent } from './components/videos/videos.component';
import { ImagesComponent } from './components/images/images.component';
import { ChatliveComponent } from './components/chatlive/chatlive.component';
import { AboutComponent } from './components/about/about.component';
import { TomatoService } from './api/tomato.service';
import { LoadingComponent } from './components/loading/loading.component';
import { VideoItemComponent } from './components/videos/video-item/video-item.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { DurationFormatPipe } from './duration-format.pipe';
import { ImageItemComponent } from './components/images/image-item/image-item.component';
import { ImageBannerComponent } from './components/images/image-banner/image-banner.component';
import { SingleMediaPlayerComponent } from './components/single-media-player/single-media-player.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'video/:id',
    component: SingleMediaPlayerComponent
  },
  {
    path: 'images',
    component: ImagesComponent,
    children: [
      {
        path: ':id',
        component: ImageBannerComponent
      }
    ]
  },
  {
    path: 'chat-live',
    component: ChatliveComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideosComponent,
    ImagesComponent,
    ChatliveComponent,
    AboutComponent,
    LoadingComponent,
    VideoItemComponent,
    TimeAgoPipe,
    VideoPlayerComponent,
    DurationFormatPipe,
    ImageItemComponent,
    ImageBannerComponent,
    SingleMediaPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    LoggerModule.forRoot({
      //serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.INFO
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [TomatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
