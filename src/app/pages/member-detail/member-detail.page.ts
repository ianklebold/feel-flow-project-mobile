import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.page.html',
  styleUrls: ['./member-detail.page.scss'],
})
export class MemberDetailPage implements OnInit {

  constructor( private navController: NavController ) { }

  showSwiper = true;
  loading = false;

  ngOnInit() {}

  ionViewWillLeave() {
    // Opcional: si quieres limpiar el swiper al salir
    this.showSwiper = false;
  }

  ionViewDidEnter() {
    this.resetSwiper();
  }

  resetSwiper() {
    // Fuerza a Angular a destruir y recrear el swiper
    this.showSwiper = false;
    setTimeout(() => {
      this.showSwiper = true;
    }, 1); // 50ms de retardo; ajusta según sea necesario
  }

  onImgLoad() {
    this.loading = false;
  }

  onTeams(){
    this.navController.navigateRoot('teams');
  }

}
