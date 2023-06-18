import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-shop';

  @ViewChild('stickyMenu') menuElement!: ElementRef;

  sticky: boolean = false;
  elementPosition: any;

  whatsappMessage(){
    window.location.href='https://wa.me/679181026?text=Hi, I saw the product that you are selling and I want to get more details';
  }

  telegramMessage(){
    window.location.href='https://wa.me/679181026?text=Hi, I saw the product that you are selling and I want to get more details';
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll >= this.elementPosition){
        this.sticky = true;
      } else {
        this.sticky = true;
      }
    }
}
