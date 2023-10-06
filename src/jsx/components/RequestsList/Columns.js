import {parse} from 'date-fns';
import { ColumnFilter, DropdownFilter } from './ColumnFilter';

export const COLUMNS = [
	{
		Header : 'Id',
		Footer : 'Id',
		accessor: '_id',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Baby Firstname',
		Footer : 'Baby Firstname',
		accessor: 'firstNameBB',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Baby LastName',
		Footer : 'Baby LastName',
		accessor: 'lastNameBB',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Parent FullName',
		Footer : 'Parent FullName',
		accessor: 'fullName',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Date of  Birth',
		Footer : 'Date of  Birth',
		accessor: 'birthDate',
		Filter: ColumnFilter,
		disableFilters: true,		
	},
	{
		Header : 'Nationality',
		Footer : 'Nationality',
		accessor: 'Nationality',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	{
		Header : 'Status',
		Footer : 'Status',
		accessor: 'ReqStatus',
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