import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule } from 'ngx-logger';
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
import { SignBoxComponent } from './components/sign-box/sign-box.component';
import { PostVideoComponent } from './components/post-video/post-video.component';
import { PersonnelPageComponent } from './components/personnel-page/personnel-page.component';
import { AuthGuard } from './auth.guard';
import { NgxLoggerLevel } from 'ngx-logger/lib/types/logger-level.enum';


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
    component: VideosComponent,
    canActivate: [AuthGuard]
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
    component: ChatliveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'post/video',
    component: PostVideoComponent
  },
  {
    path: 'page',
    component: PersonnelPageComponent
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
    SingleMediaPlayerComponent,
    SignBoxComponent,
    PostVideoComponent,
    PersonnelPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      enableTracing: true // for debug only
    }),
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
  entryComponents: [SignBoxComponent],
  providers: [TomatoService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
