import React, { Component, useState} from "react";
import { Col, Row, Card, Button, Modal} from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { formatDate } from '@fullcalendar/core'
import axios from 'axios'
import _uniqueId from 'lodash/uniqueId';
import ConfigData from "../../../../config.json";

class EventCalendar extends Component {
   
   current_user_id = JSON.parse(localStorage.getItem("userDetails"))['id']
   setAppointments = (appointments) =>{
      let myCalendarEvents = []
      
      for (let index = 0; index < appointments.length; index++) {
         let appo = appointments[index];
         myCalendarEvents.push({
            title: appo.subject,
            extendedProps: {
            patientName: appo.pw_email,
            patientContact: "+33xxxx" },
            start: new Date(appo.start_date),
            end: new Date( appo.end_date),
            id: String(appo._id)
            
         })
      }
      return myCalendarEvents
   }
   getAppointments = () => { try {
      
      return axios.get(`${ConfigData.SERVER_URL_PROD}/users/appointmentsC/${this.current_user_id}`).then((response)=>{
        
        
         this.setState({calendarEvents: this.setAppointments(response.data)})
      })
      }
      catch (err) { return; } };

   state = {
   calendarEvents: this.getAppointments(),
   addEvent: false,
   calendarApi: null
   };
   
   eventClick = (eventClick) => {
      let startTimeEvent = eventClick.event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      let endTimeEvent =eventClick.event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      let eventDate = formatDate(eventClick.event.start, {
         month: 'long',
         year: 'numeric',
         day: 'numeric'
       })
      // startDateEvent = eventClick.event.start.formatDate()
      Alert.fire({
         title: eventDate ,
         html:
            `<div className="table-responsive">
      <table className="table" style={{"text-align":"left"}}>
      <tbody>
      <tr >
      <td>Patient:&nbsp
      <strong>` +
      eventClick.event.extendedProps.patientName +
      `</strong>&nbsp</td>
      <td>For&nbsp<strong>` +
            eventClick.event.title +
            `</strong> &nbsp</td>
      </tr>
      <tr >
      <td>Appointment Time:</td>
      <td>&nbspFrom&nbsp <strong>
      ` +
      startTimeEvent +
            `
      </strong>
      
      &nbspTo&nbsp<strong>
      ` +
      endTimeEvent +
            `
      </strong></td>
      </tr>

      </tbody>
      </table>
      </div>`,

         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Remove Event",
         cancelButtonText: "Close",
      }).then((result) => {
         if (result.value) {
            
            eventClick.event.remove(); // It will remove event from the calendar
            
            let config = {
               method: 'delete',
               maxBodyLength: Infinity,
               url: `${ConfigData.SERVER_URL_PROD}/appointments/${eventClick.event.id}`,
               headers: { 
                 'Accept': 'application/json'
               }
             };
             
             axios.request(config)
             .then((response) => {
               console.log(JSON.stringify(response.data));
             })
             .catch((error) => {
               console.log(error);
             });
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });
   };

   handleDateSelect = (selectInfo) => {
      this.setState({addEvent: true})
      // let title = prompt('Please enter a new title for your event')
      this.setState({calendarApi: selectInfo.view.calendar, start: selectInfo.start,
         end: selectInfo.end,
         allDay: true})
      this.state.calendarApi.unselect() // clear date selection
      
   
    }
   
   addEvent = (eventDetails) => {
      this.state.calendarApi.addEvent(
         {
            title: eventDetails.title,
            extendedProps: {
            patientName: eventDetails.patientName,
            patientContact: "+33xxxxxxxxx" },
            start: this.state.start,
            end: this.state.end,
            id: _uniqueId(eventDetails.title)
         }
      )
      let data = JSON.stringify({
         "dest_id": this.current_user_id,
         "start_date": this.state.start,
         "end_date": this.state.end,
         "subject": eventDetails.title,
         "pw_email": eventDetails.patientName,
         "status": "Pending"
       });
       
       let config = {
         method: 'post',
         maxBodyLength: Infinity,
         url: ConfigData.SERVER_URL_PROD +'/appointments',
         headers: { 
           'Content-Type': 'application/json', 
           'Accept': 'application/json'
         },
         data : data
       };
       
       axios.request(config)
       .then((response) => {
         console.log(JSON.stringify(response.data));
       })
       .catch((error) => {
         console.log(error);
       });
      
      
   }
   
   render() {
      // this.state.calendarEvents= this.setAppointments(this.props.appointments)

      return (
         <div className="animated fadeIn demo-app">
            <Row>
               <Col lg={9}>
                  <Card>
                     <Card.Body>
                        <div className="demo-app-calendar" id="mycalendartest">
                           <FullCalendar
                              defaultView="timeGridWeek"
                              
                              headerToolbar={{
                                 left: 'prev,next today',
                                 center: 'title',
                                 right: ',timeGridDay, timeGridWeek, dayGridMonth'
                               }}
                              rerenderDelay={10}
                              eventDurationEditable={false}
                              editable={true}
                              droppable={true}
                              selectable={true}
                              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                              ref={this.calendarComponentRef}
                              weekends={this.state.calendarWeekends}
                              events={this.state.calendarEvents}
                              eventDrop={this.drop}
                              // drop={this.drop}
                              select={this.handleDateSelect}
                              eventReceive={this.eventReceive}
                              eventClick={this.eventClick}
                              // selectable={true}
                           />
                        </div>
                        <Modal className="fade" show={this.state.addEvent}>
                           <Modal.Header>
                              <Modal.Title>Add Appointment</Modal.Title>
                              <Button
                                 onClick={() => this.setState({addEvent: false})}
                                 variant=""
                                 className="close"
                              >
                                 <span>&times;</span>
                              </Button>
                           </Modal.Header>
                        <Modal.Body>
            <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Set Appointment Details</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => {e.preventDefault(); let eventDetails = {};
                  let myData = new FormData(e.target); myData.forEach((value,key)=> eventDetails[key]=value); this.addEvent(eventDetails)}}>
                  <div className='form-group row'>
                    <label className='col-sm-3 col-form-label'>Subject</label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        placeholder='Subject'
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label className='col-sm-3 col-form-label'>Patient Email</label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        className='form-control'
                        name = 'patientName'
                        placeholder='Patient Email or Personal'
                      />
                    </div>
                  </div>
                  {/* <fieldset className='form-group'>
                    <div className='row'>
                      <label className='col-form-label col-sm-3 pt-0'>
                        Radios
                      </label>
                      <div className='col-sm-9'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='Type'
                            value='Doctor'
                            defaultChecked
                          />
                          <label className='form-check-label'>
                          Appointement for Doctor
                          </label>
                        </div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='gridRadios'
                            value=''
                          />
                          <label className='form-check-label'>
                            Appointement for Patient
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset> */}
     
                  <div className='form-group row'>
                    <div className='col-sm-10'>
                      <button type='submit' className='btn btn-primary'>
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
                           </div>
                           </Modal.Body>
                           <Modal.Footer>
                              <Button
                                 onClick={() => this.setState({addEvent: false})}
                                 variant="danger light"
                              >
                                 Close
                              </Button>
                              <Button variant="primary">Save changes</Button>
                           </Modal.Footer>
                        </Modal>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}

export default EventCalendar;