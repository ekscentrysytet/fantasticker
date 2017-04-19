import { Directive, ElementRef, EventEmitter, Output, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[draggable]',
  host: {
    '(mousedown)': 'onMouseDown($event)'
  }
})
export class DraggableDirective implements OnInit {
  private deltaX: number = 0;
  private deltaY: number = 0;
  private canDrag: boolean = true;
  private initialPos: {
    left: number,
    top: number
  };
  private currentPos: {
    left: number,
    top: number
  };

  @Input('draggable')
  set draggable(val: boolean) {
    this.canDrag = !!val;
  }
  @Output() onPositionChanged = new EventEmitter<Object>();

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.initialPos = this.currentPos = {
      left: parseInt(this.el.nativeElement.style.left) || 0,
      top: parseInt(this.el.nativeElement.style.top) || 0
    }
  }

  onMouseDown(event: MouseEvent) {
    this.deltaX = event.x - this.el.nativeElement.offsetLeft;
    this.deltaY = event.y - this.el.nativeElement.offsetTop;

    document.onmousemove = (event: MouseEvent) => {
      if (this.canDrag) {
        event.preventDefault();
        this.moveTo(event.x, event.y);
      }
    };

    this.el.nativeElement.onmouseup = () => {
      document.onmousemove = null;
      this.el.nativeElement.onmouseup = null;

      if (this.hasPosChanged()) {
        this.initialPos = this.currentPos;

        this.onPositionChanged.emit(this.currentPos);
      }
    };
  }

  private hasPosChanged() {
    return (this.initialPos.left !== this.currentPos.left) || (this.initialPos.top !== this.currentPos.top);
  }

  private moveTo(x: number, y: number) {
    const position = window.getComputedStyle(this.el.nativeElement).position;
    const parentWidth = position === 'absolute' ? this.el.nativeElement.parentElement.clientWidth : window.innerWidth;
    const parentHeight = position === 'absolute' ? this.el.nativeElement.parentElement.clientHeight : window.innerHeight;

    let elemLeftEdge = x - this.deltaX;
    let elemTopEdge = y - this.deltaY;
    const rightBound = parentWidth - this.el.nativeElement.clientWidth;
    const bottomBound = parentHeight - this.el.nativeElement.clientHeight;

    if (elemLeftEdge < 0) {
      elemLeftEdge = 0;
    }

    if (elemLeftEdge > rightBound) {
      elemLeftEdge = rightBound;
    }

    if (elemTopEdge < 0) {
      elemTopEdge = 0;
    }

    if (elemTopEdge > bottomBound) {
      elemTopEdge = bottomBound;
    }

    this.currentPos = {
      left: parseInt(this.el.nativeElement.style.left),
      top: parseInt(this.el.nativeElement.style.top)
    };

    this.el.nativeElement.style.left = elemLeftEdge + 'px';
    this.el.nativeElement.style.top = elemTopEdge + 'px';
  }
}
