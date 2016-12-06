import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({
  selector: '[appElementStatus]'
})
export class ElementStatusDirective {
  private _status = '';
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @Input('appElementStatus') set status(statusName: string) {
    this._status = statusName;
    this.renderer.setElementClass(this.el.nativeElement, statusName, true);
  }

}