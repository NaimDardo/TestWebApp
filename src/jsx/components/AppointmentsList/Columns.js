import { ColumnFilter, DropdownFilter } from './ColumnFilter';

export const COLUMNS = [
	{
		Header : 'Id',
		Footer : 'Id',
		accessor: 'id',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'PatientName',
		Footer : 'PatientName',
		accessor: 'PatientName',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Mobile',
		Footer : 'Mobile',
		accessor: 'mobile',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Email',
		Footer : 'Email',
		accessor: 'email',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Purpose',
		Footer : 'Purpose',
		accessor: 'purpose',
		Filter: ColumnFilter,
		disableFilters: true,		
	},
	{
		Header : 'Date',
		Footer : 'Date',
		accessor: 'date',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Status',
		Footer : 'Status',
		accessor: 'status',
		Filter: DropdownFilter,
	}
]

export const GROUPED_COLUMNS = [
	{
		Header : 'Id',
		Footer : 'Id',
		accessor: '_id'
	},
	{
		Header : 'Name',
		Footer : 'Name',
		columns: [
			{
				Header : 'First Name',
				Footer : 'First Name',
				accessor: 'firstNameBB'
			},
			{
				Header : 'Last Name',
				Footer : 'Last Name',
				accessor: 'lastNameBB'
			},
		]
	},
	{
		Header: 'Info',
		Footer: 'Info',
		columns: [
			{
				Header : 'Date of  Birth',
				Footer : 'Date of  Birth',
				accessor: 'birthDate'
			},
			{
				Header : 'Country',
				Footer : 'Country',
				accessor: 'Nationality',
			},
		]
	},
]