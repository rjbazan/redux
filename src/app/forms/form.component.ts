import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RadioSelectorComponent } from './select.component';
import { FormState, ImportForm } from './form';

@Component({
  moduleId: module.id,
  selector: 'entry-form',
  directives: [RadioSelectorComponent],
  templateUrl: 'form.component.html'
})
export class FormComponent {
  private form: ImportForm;
  private selectAll: string;

  constructor(public store: Store<any>) {
    store.select('formReducer').subscribe((data:FormState) => {
      this.selectAll = data.SelectAll;
      this.form = data.ImportForm;
    });
  }

  onSelectAllChanged(event) {
    this.store.dispatch({ type: event.Action, payload: {} });
  }

  onRadioChange(event) {
    this.store.dispatch({ type: 'RADIO_CHANGE', payload: { value: event, form: this.form } });
  }

  submitForm() {
    this.store.dispatch({ type: 'SUBMIT_FORM', payload: this.form });
  }
}