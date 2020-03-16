import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isMobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth <= 990 ? this.isMobile = true : this.isMobile = false;
  }

}
