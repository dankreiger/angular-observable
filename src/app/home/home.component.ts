import { Subscription, interval, Observable, Observer } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private numbersObsSubscription: Subscription;
  private customObsSubscription: Subscription;
  public puppy: number;
  public style: object;
  public clickCount = 0;
  constructor() { }

  handleClick() {
    this.style = {
      color: this.clickCount % 2 ? 'red' : 'purple'
    };
    this.clickCount++;
  }

  ngOnInit() {

    /* infinite */
    const myNumbers = interval(10);
    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
        this.puppy = number;
      }
    );
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('this is an error');
        observer.complete();
      }, 5000);
      setTimeout(() => {
        // won't arrive here because it's completed
        observer.next('third package');
      }, 6000);
    });
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }

  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
}
