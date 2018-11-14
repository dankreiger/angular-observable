import { UsersService } from './../users.service';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
  }

  onActivate() {
    this.usersService.usersActivated.next(this.id);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
