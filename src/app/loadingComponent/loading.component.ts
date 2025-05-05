import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoadingComponent implements OnInit{
  constructor(public loader: LoaderService) { }
  ngOnInit() {
  }
}
