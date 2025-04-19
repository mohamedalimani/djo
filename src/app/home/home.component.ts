import { Component, OnInit } from '@angular/core';
import { DoService } from './../do.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title = 'djo';
  journal:any;
  drinks:any;
  journals:any;
  key=localStorage.getItem('key') || '';

  constructor(private dos:DoService, private router:Router){}

  ngOnInit(): void {

    if (this.key == '') console.log('empty key, return to login page');
    this.dos.authenticateToken(this.key).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(error)=>{
        console.error(error);
        this.router.navigate(['/']);
      }
    })
    
    this.getCurrentJournal();
    //get history (journals)
    this.getJournals();
    
  }

  start(){
    this.dos.start().subscribe({
      next:(res)=>{
        this.journal=res;
        this.getDrinks(res);
        this.getJournals();
      }
    })
  }

  getDrinks(journal:number){
    this.dos.getDrinks(journal).subscribe({
      next:(res)=>{
        this.drinks=res
        console.log(res);
      }
    })
  }

  getCurrentJournal(){
    this.dos.getCurrentJournal().subscribe({
      next:(res)=>{
        this.journal=res;
        this.getDrinks(res);
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  
  consume(drinkId:number, journal:number,op:string, check:number){
    if (check == 0 && op == '-') return;
    if (!drinkId || !journal) return;

    this.dos.consume(drinkId, journal,op).subscribe({
      next:(res)=>{
        this.getDrinks(this.journal);
      }
    })
  }

  totalPages=1;
  currentPage=1;

  getJournals(page=1){
    this.dos.getJournals(page).subscribe({
      next:(res)=>{
        this.journals=res.data;
        this.totalPages=res.totalPages;
        console.log(res.data)
        this.currentPage=page;
      }
    })
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getJournals(page);
    }
  }

}
