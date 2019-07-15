import { Component, NgZone } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'subtasks';
  sidenavStatus = 'ON';

  items = [
    'Item 1',
    'Item 2',
    'Settings'
  ];

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(zone: NgZone) {
    this.mediaMatcher.addEventListener('change', mql =>
      zone.run(() => this.mediaMatcher = this.mediaMatcher));
  }


  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
