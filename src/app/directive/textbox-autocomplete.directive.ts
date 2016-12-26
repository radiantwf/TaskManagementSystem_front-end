import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
@Directive({
  selector: '[myAutocomplete]',
  host: {
    '(input)': 'onInput()'
  }
})
export class TextboxAutocompleteDirective {
  private _emptyTextAutocomplete = 'off';
  private _myAutocomplete = 'on';
  private element: HTMLInputElement;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.element = el.nativeElement;
  }
  @Input() set emptyTextAutocomplete(autocomplete: string) {
    this._emptyTextAutocomplete = autocomplete || this._emptyTextAutocomplete;
    this.setAutocomplete();
  }

  @Input('myAutocomplete') set myAutocomplete(autocomplete: string) {
    this._myAutocomplete = autocomplete || this._myAutocomplete;
    this.setAutocomplete();
  }

  onInput() {
    this.setAutocomplete();
  }

  private setAutocomplete() {
    if (this.element.value === '') {
      this.renderer.setElementAttribute(this.element, 'autocomplete', this._emptyTextAutocomplete);
    } else {
      this.renderer.setElementAttribute(this.element, 'autocomplete', this._myAutocomplete);
    }
  }
}
