import { Component } from '@angular/core';

@Component({
  selector: 'wsb-root',
  template: `
    <wsb-navigation></wsb-navigation>
    <router-outlet></router-outlet>
    <wsb-footer></wsb-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'blog-page';
}
