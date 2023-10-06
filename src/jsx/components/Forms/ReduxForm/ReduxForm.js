import React from 'react';
import getThemeProps from '@material-ui/styles/getThemeProps';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import showResults from './ShowResults';
import MaterialUiForm from './MaterialUiForm';


const ReduxForm = props => {
	return (
		<>
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-8">
					<ThemeProvider muiTheme={getThemeProps()}>
						<div className="card">
							<div className="card-header">
								<h4 className="card-title">Form</h4>
							</div>
							<div className="card-body">
								<MaterialUiForm onSubmit={showResults} />
									{/* <Values form="MaterialUiForm" /> */}
							</div>
						</div>
					</ThemeProvider>	
				</div>
				 <div className="col-md-12 col-lg-4" >
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Result</h4>
						</div>
						<div className="card-body">
							<pre className="" id="ReduxFormJSON">
							</pre>
						</div>
					</div>
				</div> 
					
			</div>		
		</>
	)
}
export default ReduxForm;	
