import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopEventPropagation]'
})
export class StopEventPropagationDirective {

  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor = 'yellow';
   }

   @HostListener('click') onClick($event) {
    event.stopPropagation();
  }

}
