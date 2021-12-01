import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-slider-videos',
  templateUrl: './slider-videos.component.html',
  styleUrls: ['./slider-videos.component.scss']
})
export class SliderVideosComponent implements OnInit {
  name = "Angular";
  // videoplayer;
  //  @ViewChild("videoPlayer") videoplayer: ElementRef;
  // isPlay: boolean = false;
  // toggleVideo(event: any) {
  //   this.videoplayer.nativeElement.play();
  // }

  constructor() { }

  ngOnInit() {
  }

}
