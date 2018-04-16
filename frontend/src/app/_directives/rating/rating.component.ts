import { forwardRef, Component, OnInit, Input, Renderer2, ElementRef, Directive, HostListener, ViewChildren, QueryList, DoCheck} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Directive({
  selector: '[appTest]'
})

export class TestDirective implements OnInit {
  @Input('appTest') appTest;
  elem: HTMLElement;
  types = {
    full: 'star',
    empty: 'star_border',
    red: '#ff4858',
    yellow: '#ffb900',
    green: '#00cd00',
    black: 'black',
  };

  constructor(
    private render: Renderer2,
    private elRef: ElementRef
  ) {
    this.elem = this.elRef.nativeElement;
  }

  ngOnInit() {
    const color = this.set_color(this.appTest.rating);
    this.set_star(this.appTest.type, color);
  }

  @HostListener('click') test () {

  }

  toggle_star(flag, index) {
    const elem = this.elRef.nativeElement,
          color = this.set_color(index);
    if (flag) {
      // this.render.addClass(elem, 'pick');
      this.set_star(this.types.full, color);
    } else {
      // this.render.removeClass(elem, 'pick');
      this.set_star(this.types.empty, color);
    }
  }

  set_color(index) {
    let _c = this.types.black;
    if (index === 1) {
      _c = this.types.red;
    } else if ( index >= 2 && index < 4 ) {
      _c = this.types.yellow;
    } else if (index >= 4) {
      _c = this.types.green;
    }
    return _c;
  }

  set_star(icon: string, color: string = this.types.black) {
    this.elem.innerText = icon;
    this.render.setStyle(this.elem, 'color', color);
  }
  // pick() {
  //   const elem = this.elRef.nativeElement;
  //   Array.from(this.render.parentNode(elem).children).forEach( (el: HTMLElement) => el.classList.remove(this.pick_class));
  //   this.render.addClass(elem, this.pick_class);
  //   let _current = this.render.parentNode(elem).children[0];
  //   while (!_current.classList.contains(this.pick_class)) {
  //     this.render.addClass(_current, this.pick_class);
  //     _current = this.render.nextSibling(_current);
  //   }
  // }
}



@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})

export class RatingComponent implements OnInit, ControlValueAccessor, DoCheck {
  @Input() score: any;
  @Input() disable: boolean;
  @Input() required: any;
  @ViewChildren(TestDirective) stars_el: QueryList<TestDirective>;
  rate = [];
  full_rating: number;
  old_rating: number;
  private change_value: Function;
  constructor(
    private elRef: ElementRef
  ) { }
  ngOnInit() {
    this.set_rate(this.score);
    this.full_rating = Math.ceil(this.score);
    this.old_rating = this.score;
  }
  ngDoCheck() {
    if (this.score !== this.old_rating && this.disable) {
      // todo fix with .5
      this.stars_el.toArray().forEach( (el, index) => el.toggle_star( index <= this.score ? true : false , this.score));
      this.old_rating = this.score;
    }
  }

  // ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.change_value = fn;
  }
  writeValue(value: any) {}

  registerOnTouched(fn: any) {}

  set value(v) {
    this.change_value(v);
  }

  set_rate(score = 0) {
    let _score = score,
        type = 'star',
        half = false;
    if (score % 1) {
      half = true;
      _score = score - .5;
    }
    for (let i = 0, x = 5; i < x; i++) {
      if ( _score <= i) {
        type = 'star_border';
      }
      if ( _score === i && half) {
        type = 'star_half';
      }
      this.rate.push(type);
    }
  }
  pick(i: number) {
    if (this.disable) {
      return;
    }
    this.value = i + 1;
    this.stars_el.toArray().forEach( (el, index) => el.toggle_star( index <= i ? true : false , i + 1));
  }
}
