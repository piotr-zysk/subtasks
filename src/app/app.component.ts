import { Component, NgZone } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'subtasks';
  checked = true;
  sidenavStatus = 'ON';

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(zone: NgZone) {
    this.mediaMatcher.addListener(mql => 
      zone.run(() => this.mediaMatcher = this.mediaMatcher));
  }


  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }


  toggle_sidenav() {
    this.checked = ! this.checked;
    this.sidenavStatus = (this.sidenavStatus === 'ON') ? 'OFF' : 'ON';

  }
}
