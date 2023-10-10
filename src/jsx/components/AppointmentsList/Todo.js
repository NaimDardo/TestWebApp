import React,{useState, useEffect, useMemo} from 'react';
import {Link}  from "react-router-dom";
// import {Modal} from 'react-bootstrap';
// import {nanoid} from 'nanoid';
// import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
// import pic1 from './../../images/profile/small/pic1.jpg';
// import Editable from '../Editable';
import axios from 'axios';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy } from 'react-table';

import './filtering.css';
import ConfigData from '../../../config.json'

function refreshPage() {
    window.location.reload(false);
}




export const Todo = () =>{
	let current_user = JSON.parse(localStorage.getItem("userDetails"))
	let current_user_id = current_user['id']

	const getAppointments = async () => {
		return await axios.get(`${ConfigData.SERVER_URL_PROD}/users/appointmentsA/${current_user_id}`)
	}
	const getPW = async (pw_mail) => {
		return await axios.get(`${ConfigData.SERVER_URL_PROD}/PW/${pw_mail}`)
	}
	const [contents, setContents] = useState([]);

	const setAppointments = async (appointments) =>{
		let myAppointmentsList = []
		// const faknames = ["Madeline", "Chloe", "Nadine"]
		// let random = Math.floor(Math.random() * faknames.length)
		for (let index = 0; index < appointments.length; index++) {
		let appo = appointments[index];
		if (appo.pw_email !== ""){
			let pw = {}
			await getPW(appo.pw_email).then((resp)=> pw = resp.data)
			console.log(pw)
		myAppointmentsList.push({
			id: appo._id,
			PatientName: pw.FullName,
			mobile: pw.tel ,
			email: appo.pw_email,
			purpose: appo.subject,
			status: appo.status,
			date: `${new Date(appo.start_date.slice(0,10)).toLocaleDateString("en-US", options)} ${appo.start_date.slice(11,16)}` ,
		})}
		}
		return myAppointmentsList
}
	useEffect( () => {
		getAppointments().then(async (res) => setContents(await setAppointments(res.data)));
	}, []);
	
	const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => contents, [contents])

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
	
    
	const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
    //update data function
  
	const ConfirmAppointment = async (appo_id) => {
		await axios.put(`${ConfigData.SERVER_URL_PROD}/ConfirmAppointment/${appo_id}`,{})
		refreshPage()	
	}
	const RejectAppointment = async (appo_id) => {
		await axios.put(`${ConfigData.SERVER_URL_PROD}/RejectAppointment/${appo_id}`,{})
		refreshPage()
	}
	
	return(
		<>
			<PageTitle activeMenu="Appointments List" motherMenu="" />
			<div className="col-12">
				<div className="card">
					<div className="card-header">
						<h4 className="card-title">Appointments Datatable</h4>
					</div>
					<div className="card-body">
						<div className="w-100 table-responsive">
							<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
							<table {...getTableProps()} className="table filtering-table table-responsive-lg">
								<thead>
									{headerGroups.map(headerGroup => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map(column => (
												<th {...column.getHeaderProps(column.getSortByToggleProps())}>
													{column.render('Header')}
													<span className="ml-1">
														{column.isSorted ? (column.isSortedDesc ? <i className="fa fa-arrow-down" /> : <i className="fa fa-arrow-up" />) : ''}
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
										return (
											<tr {...row.getRowProps()}>
												{row.cells.map((cell) => {
													if (cell.column.Header === "Status") {
														return <td {...cell.getCellProps()} className="py-2 text-right">
															<span className={`badge badge-${cell.value === "Confirmed" ? "success" : cell.value === "Rejected" ? "danger" : "warning"}`}>
																{cell.render('Cell')}
																<span className="ml-1 fa fa-check" />
															</span></td>

													}
													return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
												})}
												<td>
													<div className="d-flex">
														<Link className="btn btn-primary shadow btn-xs sharp mr-2" disabled
															onClick={async () => await ConfirmAppointment(row.original.id)}
														>
															<i className="fa fa-check"></i>
														</Link>
														<Link className="btn btn-danger shadow btn-xs sharp"
															onClick={async () => await RejectAppointment(row.original.id)}
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
										onChange={e => {
											const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
											gotoPage(pageNumber)
										}}
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
			</div>
		</>
	)
}

export default Todo;