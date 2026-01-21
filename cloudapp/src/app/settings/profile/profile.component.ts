import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@exlibris/exl-cloudapp-angular-lib';
import { EsploroFields } from '../esploro-fields';
import { mandatoryFieldsAdd, mandatoryFieldsUpdate } from '../settings-utils';
import { ConfigService } from '../../services/config.service';
import { ConfTable } from '../../models/confTables';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-settings-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  displayedColumns = ['header', 'default', 'name', 'actions'];
  selectedFieldName: string = '';
  alertDelay = 8000;
  languages$: Observable<ConfTable.CodeTable>;
  isMultilingualEnabled = false;
  fieldGroups: any[] = [];
  
  // Fields that support multilingual (the _multilingual field keys)
  private multilingualFieldKeys = [
    'researcher.display_title_multilingual[].value',
    'researcher.researcher_organization_affiliation[].title_multilingual[].value',
    'researcher.researcher_previous_organization_affiliation[].title_multilingual[].value',
    'researcher.researcher_external_organization_affiliation[].title_multilingual[].value',
    'researcher.researcher_previous_external_organization_affiliation[].title_multilingual[].value',
    'researcher.researcher_keyword_multilingual[].values',
    'researcher.researcher_description[].description_multilingual[].value',
    'researcher.researcher_education[].field_of_study_multilingual[].value',
    'researcher.researcher_education[].additional_details_multilingual[].value',
    'researcher.researcher_honor[].title_multilingual[].value',
    'researcher.researcher_webpage[].title_multilingual[].value'
  ];
  
  dataSource: MatTableDataSource<any>;
  @ViewChild('table') table: MatTable<any>;
  @Input() form: FormGroup;

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
  ) { }

  esploroFieldsInstance = EsploroFields.getInstance();

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.fields.controls);
    
    // Check if multilingual is enabled
    this.configService.getCustomerParameter('esploro_researcher_load_multilingual_xsd_enabled').subscribe(value => {
      this.isMultilingualEnabled = value?.toLowerCase() === 'true';
      
      // Load field groups based on multilingual mode
      this.fieldGroups = this.esploroFieldsInstance.getEsploroFieldGroupsFiltered(this.isMultilingualEnabled);
      
      if (this.isMultilingualEnabled) {
        // Add language column to displayed columns
        const actionsIndex = this.displayedColumns.indexOf('actions');
        if (actionsIndex > -1 && !this.displayedColumns.includes('language')) {
          this.displayedColumns.splice(actionsIndex, 0, 'language');
        }
        
        // Load languages
        this.languages$ = this.configService.getCodeTable('ResearchLanguagesNames').pipe(
          map(codeTable => ({
            ...codeTable,
            row: codeTable.row
              .map(lang => ({
                ...lang,
                code: lang.code.replace(/^research\.lang\./, '')
              }))
              .sort((a, b) => a.description.localeCompare(b.description))
          }))
        );
      }
      
      // Trigger change detection
      this.cdr.markForCheck();
    });
  }

  addField() {
    this.fields.push(this.fb.group({header: '', fieldName: '', default: '', language: ''}));
    this.fields.markAsDirty();
    this.table.renderRows();
  }

  removeField(index: number) {
    this.fields.removeAt(index);
    this.fields.markAsDirty();
    this.table.renderRows();
  }

  addMandatoryFields() {
    const mandatoryFields = this.profileType.value == "ADD" ? mandatoryFieldsAdd : mandatoryFieldsUpdate;
    const esploroFields = EsploroFields.getInstance();

    mandatoryFields.forEach(currentField => {
      let fieldLabelKey = esploroFields.getLabelKeyByFieldKey(currentField.fieldName);
      this.translate.get(fieldLabelKey).subscribe(translatedFieldName => {
        if (!(this.fields.value.some(f=>f['fieldName'] == currentField.fieldName))) {
          this.fields.push(this.fb.group({header: currentField.header, fieldName: currentField.fieldName, default: '', language: ''}));
          this.fields.markAsDirty();
          this.table.renderRows();
          this.alert.success(this.translate.instant('Profile.MandatoryFieldAdded', {field: translatedFieldName}), { delay: this.alertDelay });
        } else {
          this.alert.info(this.translate.instant('Profile.MandatoryFieldAlreadyExisting', {field: translatedFieldName}), { delay: this.alertDelay });
        }
      });
    });
  }

  get fields() { return this.form ? (this.form.get('fields') as FormArray) : new FormArray([])}
  get profileType() { return this.form ? (this.form.get('profileType') as FormControl) : new FormControl('')}
  
  isFieldMultilingual(fieldName: string): boolean {
    return this.multilingualFieldKeys.includes(fieldName);
  }
}