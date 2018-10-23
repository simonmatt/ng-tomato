import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {
  isSelected: boolean = false;
  @Input() image: any;
  constructor() { }

  ngOnInit() {
  }

}
