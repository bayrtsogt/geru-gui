// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  layout: string = 'default';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),                // wait for navigations to finish :contentReference[oaicite:3]{index=3}
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;   // drill down to the active child :contentReference[oaicite:4]{index=4}
        return route;
      }),
      mergeMap(route => route.data)                           // pull in the route.data object :contentReference[oaicite:5]{index=5}
    ).subscribe((data: Data) => {
      this.layout = data['layout'] || 'default';             // store the layout flag :contentReference[oaicite:6]{index=6}
    });


  }
}
