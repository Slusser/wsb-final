import { Component} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'wsb-admin-panel',
  templateUrl: `admin-panel.component.html`,
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent{

  constructor(public authService: AuthService){}

  onSubmit() {this.authService.logout()}
}
