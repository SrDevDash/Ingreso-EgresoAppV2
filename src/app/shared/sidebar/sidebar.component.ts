import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() nombre: string;

  constructor(private autService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.autService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
