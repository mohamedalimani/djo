import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DoService } from '../do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  key:string=localStorage.getItem('key') || '';

  constructor(private dos:DoService, private router:Router){}

  ngOnInit(): void {
    this.authenticateToken();
  }

  authenticateToken(){
    this.dos.authenticateToken(this.key).subscribe({
      next:(res)=>{
        localStorage.setItem('key',res);
        this.router.navigate(['/home'])
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

}
