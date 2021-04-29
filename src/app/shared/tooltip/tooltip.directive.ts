import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipStr: string;
  tooltip: HTMLElement;
  delay = 500;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.setAttribute(this.tooltip, 'hidden', '');
    // this.removeTooltip();
     // on mouse over it will remove the opacity
  }

  // showTooltip() {
  //   this.tooltip = this.renderer.createElement('span');
  //   this.tooltip.appendChild(this.renderer.createText(this.tooltipStr));
  //   const parent = this.renderer.parentNode(this.el.nativeElement)
  //   this.renderer.insertBefore(parent, this.tooltip, this.el.nativeElement);
  // }

  // removeTooltip() {
  //   console.log('remove');
  // }

  showTooltip() {
    this.tooltip = this.renderer.createElement('span');

    const tooltipArrow = this.renderer.createElement('span');
    this.renderer.addClass(tooltipArrow, 'tooltip-arrow');

    const tooltipText = this.renderer.createElement('span');
    this.renderer.addClass(tooltipText, 'tooltip-text');

    this.renderer.appendChild(this.tooltip, tooltipArrow);
    this.renderer.appendChild(this.tooltip, tooltipText);

    this.renderer.appendChild(
      tooltipText,
      this.renderer.createText(this.tooltipStr)
      // adding the tooltip text into the tooltip span
    );
    const { top, bottom, left, right, height, width } = this.el.nativeElement.getBoundingClientRect();
    console.log(top, bottom, left, right, height, width)

    const midHeight = bottom - (height / 2) - 15;
    let ttTop, ttLeft;

    ttTop = midHeight;
    ttLeft = right;
    this.renderer.setStyle(this.tooltip, 'top', `${ttTop}px`);
    //adding a top positions value for the tooltip
    this.renderer.setStyle(this.tooltip, 'left', `${ttLeft}px`);
    // adding the left value
    this.renderer.appendChild(document.body, this.tooltip);
   // appending to the document
    this.renderer.addClass(this.tooltip, 'tooltip');
   // adding the tooltip styles
  }
}
