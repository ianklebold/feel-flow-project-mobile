import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent  implements OnInit {

  @Input() errorMessage: string | undefined;

  ngOnInit() {}
  
  showErrorMessage = false;

  constructor() {}

  showError() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }

  getFirstError(errors: { [key: string]: string }[]): string {
    if (errors && errors.length > 0) {
      const firstError = errors[0];
      const keys = Object.keys(firstError);
      if (keys.length > 0) {
        return firstError[keys[0]];
      }
    }
    return '';
  }

}
