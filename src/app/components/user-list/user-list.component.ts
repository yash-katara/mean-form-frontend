import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
  }

  downloadPDF(id: string) {
    this.userService.downloadPDF(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `User_${id}.pdf`;
      link.click();
    });
  }
}
