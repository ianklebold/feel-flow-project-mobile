import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-team-card',
  templateUrl: './member-team-card.component.html',
  styleUrls: ['./member-team-card.component.scss'],
})
export class MemberTeamCardComponent  implements OnInit {

  constructor(
      private router: Router
    ) { }

  loading = false;

  ngOnInit() {}

  onImgLoad() {
    this.loading = false;
  }

  onMemberDetail(){
    this.router.navigate(['/member-detail']);
  }

}
