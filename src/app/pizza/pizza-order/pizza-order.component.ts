import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../pizza.actions';
import * as fromPizza from '../pizza.reducer';

@Component({
  selector: 'pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {
  pizzas: Observable<any>;

  constructor(private store: Store<fromPizza.State>) { }

  ngOnInit() {
    this.pizzas = this.store.select(fromPizza.selectAll);
  }

  createPizza(): void {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    }
    const action = new actions.Create(pizza);
    this.store.dispatch(action);
  }

  updatePizza(id: string, size: string):void {
    const action = new actions.Update(id, { size: size });
    this.store.dispatch(action);
  }

  deletePizza(id: string): void {
    const action = new actions.Delete(id);
    this.store.dispatch(action);
  }
}
