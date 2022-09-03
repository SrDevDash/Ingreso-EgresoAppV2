import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datos: string = null;
  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    // Cada vez que se cambie el usuario en la BD se ejecuta el arrow function
    this.userService.getUser('9bXUjQN33LUK2rxVfcVdSxklymW2').subscribe((usuario) => {
      console.log(usuario);
    })
  }

}
