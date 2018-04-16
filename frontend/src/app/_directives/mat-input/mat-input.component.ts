import { Component, OnInit, Directive, ElementRef, Renderer2, ViewEncapsulation, ViewChild, ContentChild, AfterContentInit, Input } from '@angular/core';

@Directive({
  selector: '[matInput]',
  host: {
    '(focus)' : 'focus_elem()',
    '(blur)' : 'leave_elem()'
  }
})

export class MatInputDirective implements OnInit{
  elem: HTMLInputElement;
  fix_holder: string;
  @Input() placeholder;
  @Input() ngModel;
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.elem = this.elRef.nativeElement;
    this.fix_holder = this.placeholder;
    this.renderer.removeAttribute(this.elem, 'placeholder');
    this.renderer.addClass(this.elem, 'mat_input__input');
    if (this.ngModel) {
      this.renderer.addClass(this.elem.parentElement, 'lock');
    }
  }

  leave_elem() {
    this.elem.value ? this.elem.parentElement.classList.remove('active') : this.elem.parentElement.classList.remove('active', 'lock') ;
  }

  focus_elem() {
    this.elem.parentElement.classList.add('active', 'lock');
    // this.renderer.setAttribute(this.elem.parentElement, 'class', 'active lock');
  }

}


@Component({
  selector: 'mat-input',
  templateUrl: './mat-input.component.html',
  styleUrls: ['./mat-input.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class MatInputComponent implements AfterContentInit {
  placeholder: string;
  @ViewChild(MatInputDirective) inp: any;
  @ContentChild(MatInputDirective) contentChild;
  constructor() { }

  ngAfterContentInit() {
    this.placeholder = this.contentChild.fix_holder;
  }
}


