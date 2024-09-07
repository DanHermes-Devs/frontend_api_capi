import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { UserResults } from '../../interfaces/address';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  public userResults$!: Observable<UserResults>;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.userResults$ = this.service.getUserList()
  }
}
