import React,{ useMemo, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import PageTitle from "./../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS, GROUPED_COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter'; 
import './filtering.css';
import axios from 'axios';
import ConfigData from "../../../config.json";

function refreshPage() {
    window.location.reload(false);
}

export const RequestsTable = () => {
	let current_user = JSON.parse(localStorage.getItem("userDetails"))
	let current_user_id = current_user['id']
	async function getRequests () {
		return await axios.get(`${ConfigData.SERVER_URL_PROD}/nurses/RequestsA/${current_user_id}`)
		
	}
	const [dataC, setDataC] = useState([]);

	useEffect(() => {
		
		getRequests().then((res) => {setDataC(res.data)});
	  }, []);


	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => dataC, [dataC])
	
	const ConfirmRequest = async (req_id) => {
		await axios.put(`${ConfigData.SERVER_URL_PROD}/ConfirmRequest/${req_id}`,{})
		refreshPage()	
	}
	const RejectRequest = async (req_id) => {
		await axios.put(`${ConfigData.SERVER_URL_PROD}/RejectRequest/${req_id}`,{})
		refreshPage()
	}
 
	const tableInstance = useTable({
		columns,
		data,	
		initialState : {pageIndex : 0}
	},  useGlobalFilter, useFilters, useSortBy, usePagination,)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance
	
	
	const {globalFilter, pageIndex} = state
	
	
	return(
		<>
			<PageTitle activeMenu="List" motherMenu="Requests" />
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">Requests Table</h4>
                </div>
				<div className="card-body">
					<div className="table-responsive">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
						<table {...getTableProps()} className="table filtering-table table-responsive-lg">
							<thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps(column.getSortByToggleProps())}>
												{column.render('Header')}
												<span className="ml-1">
													{column.isSorted ? (column.isSortedDesc ?  <i className="fa fa-arrow-down" /> :  <i className="fa fa-arrow-up" /> ) : '' }
												</span>
												{column.canFilter ? column.render('Filter') : null}
												
											</th>
										))}
									</tr>
							   ))}
							</thead> 
							<tbody {...getTableBodyProps()} className="" >
							
								{page.map((row) => {
									prepareRow(row)
									return(
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												if (cell.column.Header === "Status") {
													return <td {...cell.getCellProps()} className="py-2 text-right">
																<span className={`badge badge-${cell.value==="Confirmed"? "success" : cell.value==="Rejected"? "danger": "warning"}`}>
																{cell.render('Cell')}
																<span className="ml-1 fa fa-check" />
																</span></td>
													 
												}
												return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
											})}
											<td>
												<div className="d-flex">
													<Link className="btn btn-primary shadow btn-xs sharp mr-2" disabled
														onClick={async ()=>  await ConfirmRequest(row.original._id)}
													>
														<i className="fa fa-check"></i>
													</Link>
													<Link  className="btn btn-danger shadow btn-xs sharp" 
														onClick={async ()=> await RejectRequest(row.original._id)}
													>
														<i className="fa fa-times"></i>
													</Link>
														
												</div>												
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						<div className="d-flex justify-content-between">
							<span>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{''}
							</span>
							<span className="table-index">
								Go to page : {' '}
								<input type="number" 
									className="ml-2"
									defaultValue={pageIndex + 1} 
									onChange = {e => { 
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
										gotoPage(pageNumber)
									} } 
								/>
							</span>
						</div>
						<div className="text-center">	
							<div className="filter-pagination  mt-3">
								<button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
								
								<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
									Previous
								</button>
								<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
								<button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
	
}
export default RequestsTable;