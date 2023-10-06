import React from 'react';

export const ColumnFilter = ( { column } ) => {
	
	const {filterValue, setFilter} = column
	return(
		<div>
		
			<input className="form-control input-search"
				value={filterValue || ''}  onChange={e => setFilter(e.target.value)} />
		</div>
	)
} 


export const DropdownFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const handleFilterChange = (e) => {
    setFilter(e.target.value || undefined);
  };

  return (
    <select className="form-control select-input" value={filterValue} onChange={handleFilterChange}>
      <option value="">All</option>
      {/* <option value="Pending">Pending</option> */}
      <option value="Confirmed">Confirmed</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
}

