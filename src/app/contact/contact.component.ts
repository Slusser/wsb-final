import { Component} from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'wsb-contact',
  templateUrl: `contact.component.html`,
  styleUrls: [`contact.component.css`]
})

export class ContactComponent{

  constructor(private httpClient: HttpClient){}

  messageSuccess: boolean = false;

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.httpClient.post('https://formspree.io/f/mzbydvek',{name: email.name, replyto: email.email, message: email.messages },{'headers': headers }).subscribe();
          
      this.messageSuccess = true

      setTimeout(()=>{
        this.messageSuccess = false;
        contactForm.reset();
      }, 3000);     
    }
  }
}
