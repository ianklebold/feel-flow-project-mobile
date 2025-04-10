import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-team-card',
  templateUrl: './member-team-card.component.html',
  styleUrls: ['./member-team-card.component.scss'],
})
export class MemberTeamCardComponent  implements OnInit {

  constructor() { }

  loading = false;

  ngOnInit() {}

  onImgLoad() {
    this.loading = false;
  }

}
