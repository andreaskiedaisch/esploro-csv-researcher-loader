import { Injectable } from "@angular/core";
import { Settings } from "../models/settings";
import { CloudAppRestService, CloudAppSettingsService } from '@exlibris/exl-cloudapp-angular-lib';
import { Observable } from "rxjs";
import { ConfTable } from "../models/confTables";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _settings: Settings;

  constructor( 
    private restService: CloudAppRestService,
    private settingsService: CloudAppSettingsService
  ) {  }

  getCodeTable(name: string = null): Observable<ConfTable.CodeTable> {
    return this.restService.call( {
      url: '/esploro/v1/researchconf/code-tables/' + name
    }).pipe(map( results => results as ConfTable.CodeTable))
  }
  
  getMappingTable(name: string = null): Observable<ConfTable.MappingTable> {
    return this.restService.call( {
      url: '/esploro/v1/conf/mapping-tables/' + name
    }).pipe(map( results => results as ConfTable.MappingTable))
  }

  getCustomerParameter(parameterName: string): Observable<string | null> {
    return this.getMappingTable('CustomerParameters').pipe(
      map(mappingTable => {
        const row = mappingTable.row?.find(r => r.column0?.toLowerCase() === parameterName?.toLowerCase());
        return row ? row.column2 : null;
      })
    );
  }

  
}