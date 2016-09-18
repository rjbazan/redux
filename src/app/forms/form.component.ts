import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormState, ImportForm } from './form';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, Validator} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'entry-form',
  templateUrl: 'form.component.html'
})
export class FormComponent {
  private form: any;
  private selectAll: string = 'NOT_IMPORT';
  private importForm: FormGroup;


  constructor(public store: Store<any>, private builder: FormBuilder) {
    this.importForm = builder.group({
      File: ['', Validators.required],
      CompanySettings: 'NOT_IMPORT',
      AccountSettings: 'NOT_IMPORT',
      AnalysisPlans: 'NOT_IMPORT',
      Reconciliation: 'NOT_IMPORT',
      DataMergeRules: 'NOT_IMPORT',
      ImportProfiles: 'NOT_IMPORT',
      ReportTemplates: 'NOT_IMPORT',
      LookupTables: 'NOT_IMPORT',
      Users: ['NOT_IMPORT']
    });

    this.importForm.valueChanges
    .subscribe(val => {
      let insertKeys = ['CompanySettings', 'AnalysisPlans', 'Reconciliation', 'DataMergeRules', 'ImportProfiles', 'ReportTemplates', 'LookupTables', 'Users'];
      let overwriteKeys = ['CompanySettings', 'AnalysisPlans', 'Reconciliation', 'DataMergeRules', 'ImportProfiles', 'ReportTemplates', 'LookupTables', 'AccountSettings'];
      let formKeys = ['CompanySettings', 'AnalysisPlans', 'Reconciliation', 'DataMergeRules', 'ImportProfiles', 'ReportTemplates', 'LookupTables', 'AccountSettings', 'Users'];


      if (overwriteKeys.every(item => val[item] == 'OVERWRITE')) {
        this.selectAll = 'OVERWRITE';
      } else if (insertKeys.every(item => val[item] == 'INSERT')) {
        this.selectAll = 'INSERT';
      } else if (insertKeys.every(item => val[item] == 'NOT_IMPORT')) {
        this.selectAll = 'NOT_IMPORT';
      } else {
        this.selectAll = '';
      }
    });
  }

  onSelectAllChanged(event) {
    this.importForm.patchValue({
      CompanySettings: event.Action,
      AccountSettings: event.Action,
      AnalysisPlans: event.Action,
      Reconciliation: event.Action,
      DataMergeRules: event.Action,
      ImportProfiles: event.Action,
      ReportTemplates: event.Action,
      LookupTables: event.Action,
      Users: event.Action
    });
  }

  onRadioChange(event) {
    console.log(event)
    //this.store.dispatch({ type: 'RADIO_CHANGE', payload: { value: event, form: this.form } });
  }

  checkboxChange(event) {
    console.log(event)
  }

  getForm(event) {
    console.log(event)
  }
  fileUpload(event) {
    console.log(event)
  }

  submitForm(form) {
    console.log(this.importForm.valid)
    console.log(form)
    //this.store.dispatch({ type: 'SUBMIT_FORM', payload: this.form });
  }
}