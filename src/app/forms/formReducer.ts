import { Action } from '@ngrx/store';

import { FormState } from './form';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


export const formReducer = (initialState: FormState = {
  SelectAll: 'NOT_IMPORT',
  ImportForm: {
    CompanySettings: 'NOT_IMPORT',
    AccountSettings: 'NOT_IMPORT',
    AnalysisPlans: 'NOT_IMPORT',
    Reconciliation: 'NOT_IMPORT',
    DataMergeRules: 'NOT_IMPORT',
    ImportProfiles: 'NOT_IMPORT',
    ReportTemplates: 'NOT_IMPORT',
    LookupTables: 'NOT_IMPORT',
    Users: 'NOT_IMPORT'
  }

}, action: Action) => {
  switch (action.type) {
    //Actions initiated by the user/front end
    case "NOT_IMPORT":
      return Object.assign({}, initialState, {
        SelectAll: action.type,
        ImportForm: {  
          CompanySettings: action.type,
          AccountSettings: action.type,
          AnalysisPlans: action.type,
          Reconciliation: action.type,
          DataMergeRules: action.type,
          ImportProfiles: action.type,
          ReportTemplates: action.type,
          LookupTables: action.type,
          Users: action.type
        }

      });

    case "OVERWRITE":
      return Object.assign({}, initialState, {
        SelectAll: action.type,
        ImportForm: {
          CompanySettings: action.type,
          AccountSettings: action.type,
          AnalysisPlans: action.type,
          Reconciliation: action.type,
          DataMergeRules: action.type,
          ImportProfiles: action.type,
          ReportTemplates: action.type,
          LookupTables: action.type,
          Users: initialState.ImportForm.Users,
        }

      });

    case "INSERT":
      return Object.assign({}, initialState, {
        SelectAll: action.type,
        ImportForm: {
          CompanySettings: action.type,
          AccountSettings: initialState.ImportForm.AccountSettings,
          AnalysisPlans: action.type,
          Reconciliation: action.type,
          DataMergeRules: action.type,
          ImportProfiles: action.type,
          ReportTemplates: action.type,
          LookupTables: action.type,
          Users: action.type
        }

      });

    case "RADIO_CHANGE":
      let insertKeys = ['CompanySettings', 'AnalysisPlans', 'Reconciliation', 'DataMergeRules', 'ImportProfiles', 'ReportTemplates', 'LookupTables', 'Users'];
      let overwriteKeys = ['CompanySettings', 'AnalysisPlans', 'Reconciliation', 'DataMergeRules', 'ImportProfiles', 'ReportTemplates', 'LookupTables', 'AccountSettings'];
      let formKeys = ['CompanySettings', 'AnalysisPlans', 'Reconciliation', 'DataMergeRules', 'ImportProfiles', 'ReportTemplates', 'LookupTables', 'AccountSettings', 'Users'];

      let valuesArray = action.payload.value === 'INSERT' ?
        insertKeys.map(key => action.payload.form[key]) : action.payload.value === 'OVERWRITE' ?
          overwriteKeys.map(key => action.payload.form[key]) : formKeys.map(key => action.payload.form[key]);
      //valuesArray.shift();

      return Object.assign({}, initialState, {
        SelectAll: valuesArray.every(v => v == valuesArray[0]) ? action.payload.value : ''
      });


    default:
      return initialState;
  }
}