enum EsploroFieldGroupEnum {
	Educations = "FieldGroups.Educations",
	Engagements = "FieldGroups.Engagements",
	General = "FieldGroups.General",
	Honors = "FieldGroups.Honors",
	Identifiers = "FieldGroups.Identifiers",
	NameVariants = "FieldGroups.NameVariants",
	ResearcherName = "FieldGroups.ResearcherName",
	CurIntAffiliations = "FieldGroups.CurIntAffiliations",
	PrevIntAffiliations = "FieldGroups.PrevIntAffiliations",
	CurExtAffiliations = "FieldGroups.CurExtAffiliations",
	PrevExtAffiliations = "FieldGroups.PrevExtAffiliations",
	WebPages = "FieldGroups.Webpages",
}

interface EsploroField {
	name: string;
	key: string;
	label: string;
}

interface EsploroFieldGroup {
  name: EsploroFieldGroupEnum;
  fields: EsploroField[];
}

export class EsploroFields {
	private static _instance: EsploroFields;
	private _fieldgroups: EsploroFieldGroup[] = [
		{
      name: EsploroFieldGroupEnum.General, fields: [
				{ name: 'primaryId', key: 'primary_id', label: 'FieldNames.PrimaryId' },
				{ name: 'defaultPublLang', key: 'researcher.default_publication_language.value', label: 'FieldNames.DefaultPublicationLanguage' },
				{ name: 'displayTitle', key: 'researcher.display_title', label: 'FieldNames.DisplayTitle' },
				{ name: 'displayTitleMultilingual', key: 'researcher.display_title_multilingual[].value', label: 'FieldNames.DisplayTitle' },
				{ name: 'portalProfile', key: 'researcher.portal_profile.value', label: 'FieldNames.PortalProfile' },
				{ name: 'researchCenter', key: 'researcher.research_center', label: 'FieldNames.ResearchCenter' },
				{ name: 'autoCapture', key: 'researcher.auto_capture', label: 'FieldNames.AutoCapture' },
				{ name: 'position', key: 'researcher.position.value', label: 'FieldNames.Position' },
				{ name: 'descriptions', key: 'researcher.researcher_description[].description', label: 'FieldNames.Description' },
				{ name: 'descriptionsMultilingual', key: 'researcher.researcher_description[].description_multilingual[].value', label: 'FieldNames.Description' },
				{ name: 'languages', key: 'researcher.researcher_language[].value', label: 'FieldNames.Languages' },
				{ name: 'associations', key: 'researcher.researcher_association[].value', label: 'FieldNames.Associations' },
				{ name: 'alternateEmails', key: 'researcher.researcher_alternate_email[].email_address', label: 'FieldNames.AlternateEmails' },
				{ name: 'researchTopics', key: 'researcher.researcher_research_topic[].value', label: 'FieldNames.ResearchTopics' },
				{ name: 'keywords', key: 'researcher.researcher_keyword[].value', label: 'FieldNames.Keywords' },
				{ name: 'keywordsMultilingual', key: 'researcher.researcher_keyword_multilingual[].values', label: 'FieldNames.Keywords' },
			]
		},
		{
			name: EsploroFieldGroupEnum.ResearcherName, fields: [
				{ name: 'researcher.firstName', key: 'researcher.researcher_first_name', label: 'FieldNames.FirstName' },
        { name: 'researcher.middleName', key: 'researcher.researcher_middle_name', label: 'FieldNames.MiddleName' },
				{ name: 'researcher.lastName', key: 'researcher.researcher_last_name', label: 'FieldNames.LastName' },
        { name: 'researcher.suffix', key: 'researcher.researcher_suffix', label: 'FieldNames.Suffix' },
        { name: 'researcher.title', key: 'researcher.researcher_title.value', label: 'FieldNames.Title' },
			]
		},
		{
      name: EsploroFieldGroupEnum.NameVariants, fields: [
        { name: 'nameVariant.firstName', key: 'researcher.researcher_name_variant[].first_name', label: 'FieldNames.FirstName' },
        { name: 'nameVariant.middleName', key: 'researcher.researcher_name_variant[].middle_name', label: 'FieldNames.MiddleName' },
        { name: 'nameVariant.lastName', key: 'researcher.researcher_name_variant[].last_name', label: 'FieldNames.LastName' },
        { name: 'nameVariant.suffix', key: 'researcher.researcher_name_variant[].name_suffix', label: 'FieldNames.Suffix' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.CurIntAffiliations, fields: [
        { name: 'curIntAff.orgaCode', key: 'researcher.researcher_organization_affiliation[].organization_code', label: 'FieldNames.OrganizationCode' },
        { name: 'curIntAff.startDate', key: 'researcher.researcher_organization_affiliation[].start_date', label: 'FieldNames.StartDate' },
        { name: 'curIntAff.endDate', key: 'researcher.researcher_organization_affiliation[].end_date', label: 'FieldNames.EndDate' },
        { name: 'curIntAff.position', key: 'researcher.researcher_organization_affiliation[].position.value', label: 'FieldNames.Position' },
        { name: 'curIntAff.title', key: 'researcher.researcher_organization_affiliation[].title', label: 'FieldNames.Title' },
        { name: 'curIntAff.titleMultilingual', key: 'researcher.researcher_organization_affiliation[].title_multilingual[].value', label: 'FieldNames.Title' },
        { name: 'curIntAff.order', key: 'researcher.researcher_organization_affiliation[].positionOrder', label: 'FieldNames.Order' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.PrevIntAffiliations, fields: [
        { name: 'prevIntAff.orgaCode', key: 'researcher.researcher_previous_organization_affiliation[].organization_code', label: 'FieldNames.OrganizationCode' },
        { name: 'prevIntAff.startDate', key: 'researcher.researcher_previous_organization_affiliation[].start_date', label: 'FieldNames.StartDate' },
        { name: 'prevIntAff.endDate', key: 'researcher.researcher_previous_organization_affiliation[].end_date', label: 'FieldNames.EndDate' },
        { name: 'prevIntAff.position', key: 'researcher.researcher_previous_organization_affiliation[].position.value', label: 'FieldNames.Position' },
        { name: 'prevIntAff.title', key: 'researcher.researcher_previous_organization_affiliation[].title', label: 'FieldNames.Title' },
        { name: 'prevIntAff.titleMultilingual', key: 'researcher.researcher_previous_organization_affiliation[].title_multilingual[].value', label: 'FieldNames.Title' },
        { name: 'prevIntAff.order', key: 'researcher.researcher_previous_organization_affiliation[].positionOrder', label: 'FieldNames.Order' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.CurExtAffiliations, fields: [
        { name: 'curExtAff.orgaCode', key: 'researcher.researcher_external_organization_affiliation[].organization_code', label: 'FieldNames.OrganizationCode' },
        { name: 'curExtAff.startDate', key: 'researcher.researcher_external_organization_affiliation[].start_date', label: 'FieldNames.StartDate' },
        { name: 'curExtAff.endDate', key: 'researcher.researcher_external_organization_affiliation[].end_date', label: 'FieldNames.EndDate' },
        { name: 'curExtAff.position', key: 'researcher.researcher_external_organization_affiliation[].position.value', label: 'FieldNames.Position' },
        { name: 'curExtAff.title', key: 'researcher.researcher_external_organization_affiliation[].title', label: 'FieldNames.Title' },
        { name: 'curExtAff.titleMultilingual', key: 'researcher.researcher_external_organization_affiliation[].title_multilingual[].value', label: 'FieldNames.Title' },
        { name: 'curExtAff.order', key: 'researcher.researcher_external_organization_affiliation[].positionOrder', label: 'FieldNames.Order' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.PrevExtAffiliations, fields: [
        { name: 'prevExtAff.orgaCode', key: 'researcher.researcher_previous_external_organization_affiliation[].organization_code', label: 'FieldNames.OrganizationCode' },
        { name: 'prevExtAff.startDate', key: 'researcher.researcher_previous_external_organization_affiliation[].start_date', label: 'FieldNames.StartDate' },
        { name: 'prevExtAff.endDate', key: 'researcher.researcher_previous_external_organization_affiliation[].end_date', label: 'FieldNames.EndDate' },
        { name: 'prevExtAff.position', key: 'researcher.researcher_previous_external_organization_affiliation[].position.value', label: 'FieldNames.Position' },
        { name: 'prevExtAff.title', key: 'researcher.researcher_previous_external_organization_affiliation[].title', label: 'FieldNames.Title' },
        { name: 'prevExtAff.titleMultilingual', key: 'researcher.researcher_previous_external_organization_affiliation[].title_multilingual[].value', label: 'FieldNames.Title' },
        { name: 'prevExtAff.order', key: 'researcher.researcher_previous_external_organization_affiliation[].positionOrder', label: 'FieldNames.Order' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.Engagements, fields: [
        { name: 'engagement.type', key: 'researcher.researcher_engagement_type[].researcher_engagement.value', label: 'FieldNames.Type' },
        { name: 'engagement.endDate', key: 'researcher.researcher_engagement_type[].engagement_end_date', label: 'FieldNames.EndDate' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.Educations, fields: [
        { name: 'education.orgaCode', key: 'researcher.researcher_education[].organization_code', label: 'FieldNames.OrganizationCode' },
        { name: 'education.degree', key: 'researcher.researcher_education[].degree', label: 'FieldNames.Degree' },
        { name: 'education.fieldOfStudy', key: 'researcher.researcher_education[].field_of_study', label: 'FieldNames.FieldOfStudy' },
        { name: 'education.fieldOfStudyMultilingual', key: 'researcher.researcher_education[].field_of_study_multilingual[].value', label: 'FieldNames.FieldOfStudy' },
        { name: 'education.fromYear', key: 'researcher.researcher_education[].from_year', label: 'FieldNames.FromDate' },
        { name: 'education.toYear', key: 'researcher.researcher_education[].to_year', label: 'FieldNames.ToDate' },
        { name: 'education.addDetails', key: 'researcher.researcher_education[].additional_details', label: 'FieldNames.AdditionalDetails' },
        { name: 'education.addDetailsMultilingual', key: 'researcher.researcher_education[].additional_details_multilingual[].value', label: 'FieldNames.AdditionalDetails' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.Honors, fields: [
        { name: 'honor.orgaCode', key: 'researcher.researcher_honor[].organization_code', label: 'FieldNames.OrganizationCode' },
        { name: 'honor.title', key: 'researcher.researcher_honor[].title', label: 'FieldNames.Title' },
        { name: 'honor.titleMultilingual', key: 'researcher.researcher_honor[].title_multilingual[].value', label: 'FieldNames.Title' },
        { name: 'honor.timePeriod', key: 'researcher.researcher_honor[].time_period', label: 'FieldNames.TimePeriod' },
      ]
    },
		{
      name: EsploroFieldGroupEnum.WebPages, fields: [
        { name: 'webPages.url', key: 'researcher.researcher_webpage[].url', label: 'FieldNames.URL' },
        { name: 'webPages.type', key: 'researcher.researcher_webpage[].type', label: 'FieldNames.Type' },
        { name: 'webPages.title', key: 'researcher.researcher_webpage[].title', label: 'FieldNames.Title' },
        { name: 'webPages.titleMultilingual', key: 'researcher.researcher_webpage[].title_multilingual[].value', label: 'FieldNames.Title' },
      ]
    },
    {
      name: EsploroFieldGroupEnum.Identifiers, fields: [
        { name: 'identifiers.value', key: 'researcher.user_identifier[].value', label: 'FieldNames.Value' },
        { name: 'identifiers.idType', key: 'researcher.user_identifier[].id_type.value', label: 'FieldNames.IdType' },
      ]
    },
	];

	private constructor(
	) {	}

	public static getInstance(): EsploroFields {
		if (!EsploroFields._instance) {
			EsploroFields._instance = new EsploroFields();
		}
		return EsploroFields._instance;
	}

	public getEsploroFieldGroups(): EsploroFieldGroup[] {
		return this._fieldgroups;
	}

	public getEsploroFieldGroupsFiltered(isMultilingualEnabled: boolean): EsploroFieldGroup[] {
		// First, identify which fields have multilingual variants
		const fieldsWithMultilingualVariants = new Set<string>();
		const multilingualToNonMultilingualMap = new Map<string, string>();
		
		this._fieldgroups.forEach(group => {
			group.fields.forEach(field => {
				if (field.key.includes('_multilingual')) {
					// Extract the base field key (remove _multilingual and array notation after it)
					// researcher.researcher_keyword_multilingual[].values -> researcher.researcher_keyword
					const baseKey = field.key.replace(/_multilingual\[\]\.(value|values)$/, '');
					fieldsWithMultilingualVariants.add(baseKey);
					
					// Find the corresponding non-multilingual field in the same group
					const nonMultiField = group.fields.find(f => 
						!f.key.includes('_multilingual') && f.key.startsWith(baseKey)
					);
					if (nonMultiField) {
						multilingualToNonMultilingualMap.set(field.key, nonMultiField.key);
					}
				}
			});
		});
		
		return this._fieldgroups.map(group => ({
			...group,
			fields: group.fields.filter(field => {
				const isMultilingualField = field.key.includes('_multilingual');
				
				if (isMultilingualEnabled) {
					// Show multilingual fields OR fields that don't have a multilingual variant
					if (isMultilingualField) {
						return true;
					}
					// Check if ANY multilingual field would replace this non-multilingual field
					const isReplacedByMultilingual = Array.from(multilingualToNonMultilingualMap.values()).includes(field.key);
					return !isReplacedByMultilingual;
				} else {
					// Show only non-multilingual fields
					return !isMultilingualField;
				}
			})
		})).filter(group => group.fields.length > 0); // Remove empty groups
	}

	public getFieldGroupNameByFieldName(fieldName: string): string {
		if(fieldName) {
      for (const group of this._fieldgroups) {
        for (const field of group.fields) {
          if (field.name === fieldName) {
            return group.name;
          }
        }
      }
    }
		return fieldName;
	}

	public getFieldGroupNameByFieldKey(fieldKey: string): string {
		if(fieldKey) {
			for (const group of this._fieldgroups) {
				for (const field of group.fields) {
					if (field.key === fieldKey) {
						return group.name;
					}
				}
			}
		}
		return fieldKey;
	}

	public getLabelKeyByFieldKey(fieldKey: string): string {
		if(fieldKey) {
			for (const group of this._fieldgroups) {
				for (const field of group.fields) {
					if (field.key === fieldKey) {
						return field.label;
					}
				}
			}
		}
		return fieldKey;
	}
}