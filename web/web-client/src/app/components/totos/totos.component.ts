import { Component, OnInit, Inject } from '@angular/core';
import { Toto } from "app/models/toto.model";
import { Subscription } from 'rxjs/Subscription';
import _ from 'lodash';

@Component({
  selector: 'app-totos',
  templateUrl: './totos.component.html',
  styleUrls: ['./totos.component.css']
})
export class TotosComponent implements OnInit {
  totos: Toto[] = [];
  subscriptionTotos: Subscription;

  constructor( @Inject('TotoService') private TotoService) { }

  ngOnInit() {
    this.getTotos();
    this.getTotos = _.debounce(this.getTotos, 1000);
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(): void{
    let scrollY = window.scrollY || window.pageYOffset
      || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      console.log('Loading more results...');
      this.getTotos();
    }
  }

  // getTotos(): void {
  //   // this.totos = this.TotoService.getTotos();
  //   this.subscriptionTotos = this.TotoService.getTotos()
  //     .subscribe(
  //       totos => {
  //         this.totos = this.totos.concat(totos);
  //       }
  //     );
  // }

  getTotos(): void {
    this.TotoService.getTotos()
      .then(totos => {
        this.totos = this.totos.concat(totos);
        //console.log(this.totos);
      })
      .catch(err => console.log(err));
  }
  
}
