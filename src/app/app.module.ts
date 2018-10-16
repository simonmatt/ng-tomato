import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { VideosComponent } from './components/videos/videos.component';
import { ImagesComponent } from './components/images/images.component';
import { ChatliveComponent } from './components/chatlive/chatlive.component';
import { AboutComponent } from './components/about/about.component';
import { TomatoService } from './api/tomato.service';


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
    path: 'images',
    component: ImagesComponent
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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [TomatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
