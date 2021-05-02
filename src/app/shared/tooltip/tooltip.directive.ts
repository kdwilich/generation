import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { style, animate, keyframes } from '@angular/animations';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipStr: string;
  @Input() position: 'top'|'right'|'bottom'|'left';
  private tooltip: HTMLElement;
  delay = 300;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
    this.renderer.appendChild(document.body, this.tooltip);
    this.renderer.addClass(this.tooltip, 'tooltip');
    setTimeout(() => {
      this.handlePosition(this.position || 'right');
      this.renderer.addClass(this.tooltip, 'fade-in');
    }, this.delay)
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.addClass(this.tooltip, 'fade-out');
    setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
    }, this.delay);
  }

  createTooltip() {
    this.tooltip = this.renderer.createElement('div');

    const tooltipArrow = this.renderer.createElement('div');
    this.renderer.addClass(tooltipArrow, `tooltip-arrow`);
    this.renderer.appendChild(this.tooltip, tooltipArrow);

    const tooltipText = this.renderer.createElement('div');
    this.renderer.addClass(tooltipText, 'tooltip-text');
    this.renderer.appendChild(this.tooltip, tooltipText);

    this.renderer.appendChild(
      tooltipText,
      this.renderer.createText(this.tooltipStr)
    );

  }

  handlePosition(pos) {
    console.log()
    const ttWidth = this.tooltip.getBoundingClientRect().width;
    const ttHeight = this.tooltip.getBoundingClientRect().height;
    console.log(this.tooltip.getBoundingClientRect())
    const { width, height, top, right, left, bottom } = this.el.nativeElement.getBoundingClientRect();
    const midW = (width / 2) - (ttWidth / 2);
    console.log(width, ttWidth)
    const midH = (height / 2) - (ttHeight / 2);
    let x, y;

    const isOffScreen = (num) => num < 0 || num > window.innerWidth;

    if (pos === 'top') {
      x = top - ttHeight + 6;
      y = midW;
      if (isOffScreen(x)) {
        x += ttHeight;
        pos = 'bottom';
      }
    } else if (pos === 'right') {
      x = top + midH;
      y = right;
    } else if (pos === 'bottom') {
      x = bottom;
      y = midW;
    } else if (pos === 'left') {
      x = top + midH;
      y = left - ttWidth - 6;

      if (isOffScreen(y)) {
        y += ttWidth;
        pos = 'right';
      }
    }

    console.log('x', x, 'y', y);

    this.renderer.setStyle(this.tooltip, 'top', `${x}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${y}px`);
    this.renderer.addClass(this.tooltip, 'tooltip-' + pos);

  }
}
