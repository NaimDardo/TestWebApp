import React, {useEffect, useState} from "react";

import EventCalendar from "./EventCalendar";

import axios from "axios";
import PageTitle from "../../../layouts/PageTitle";

const Calendar = () => {


   return (
      <div className="h-80">
         <PageTitle activeMenu="My Schedule" />
         
         <EventCalendar />
      </div>
   );
};

export default Calendar;
