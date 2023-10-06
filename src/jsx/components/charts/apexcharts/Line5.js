import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine extends React.Component {
   constructor(props) {
      super(props);
      const role = JSON.parse(localStorage.getItem("userDetails"))['role']
      if(props.props.clicked === "monthly" && role === "DOC"){
         this.state = {
            series: [
               {
                  name: "Confirmed Appointments",
                  data: props.props.stats.MSConfirmed,
               },
            ],
            options: {
               chart: {
                  height: 350,
                  type: "area",
                  group: "social",
                  toolbar: {
                     show: false,
                  },
                  zoom: {
                     enabled: false,
                  },
               },
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  width: [2, 2],
                  colors: ["#F46B68"],
                  curve: "straight",
               },
               legend: {
                  tooltipHoverFormatter: function (val, opts) {
                     return (
                        val +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex][
                           opts.dataPointIndex
                        ] +
                        ""
                     );
                  },
                  markers: {
                     fillcolors: ["#F46B68"],
                     width: 19,
                     height: 19,
                     strokeWidth: 0,
                     radius: 19,
                  },
               },
               markers: {
                  size: 6,
                  border: 0,
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  hover: {
                     size: 6,
                  },
               },
               xaxis: {
                  categories: [
                     "January",
                     "February",
                     "March",
                     "April",
                     "May",
                     "June",
                     "July",
                     "August",
                     "September",
                     "October",
                     "November",
                     "December"
                  ],
               },
               yaxis: {
                  labels: {
                     style: {
                        colors: "#3e4954",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: 100,
                     },
                  },
               },
               fill: {
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  type: "solid",
                  opacity: 0.07,
               },
               grid: {
                  borderColor: "#f1f1f1",
               },
            },
         };
      } else if(props.props.clicked === "weekly" && role === "DOC"){
         const seriesData = Array(53).fill(0).map((_, i) => `week${i+1}`);

         this.state = {
            series: [
               {
                  name: "Confirmed Appointments",
                  data: props.props.stats.WSConfirmed,
               },
            ],
            options: {
               chart: {
                  height: 350,
                  type: "area",
                  group: "social",
                  toolbar: {
                     show: false,
                  },
                  zoom: {
                     enabled: false,
                  },
               },
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  width: [2, 2],
                  colors: ["#F46B68"],
                  curve: "straight",
               },
               legend: {
                  tooltipHoverFormatter: function (val, opts) {
                     return (
                        val +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex][
                           opts.dataPointIndex
                        ] +
                        ""
                     );
                  },
                  markers: {
                     fillcolors: ["#F46B68"],
                     width: 19,
                     height: 19,
                     strokeWidth: 0,
                     radius: 19,
                  },
               },
               markers: {
                  size: 6,
                  border: 0,
                  colors: ["#F46B68"],
                  hover: {
                     size: 6,
                  },
               },
               xaxis: {
                  categories: seriesData,
               },
               yaxis: {
                  labels: {
                     style: {
                        colors: "#3e4954",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: 100,
                     },
                  },
               },
               fill: {
                  colors: ["#F46B68"],
                  type: "solid",
                  opacity: 0.07,
               },
               grid: {
                  borderColor: "#f1f1f1",
               },
            },
         };
      } else if(props.props.clicked === "weekly" && ["HOS", "DN"].includes(role)){
         const seriesData = Array(53).fill(0).map((_, i) => `week${i+1}`);

         this.state = {
            series: [
               {
                  name: "Confirmed",
                  data: props.props.stats.WSConfirmed,
               },
               {
                  name: "Rejected",
                  data: props.props.stats.WSRejected,
               },
               {
                  name: "Pending",
                  data: props.props.stats.WSPending,
               },
            ],
            options: {
               chart: {
                  height: 350,
                  type: "area",
                  group: "social",
                  toolbar: {
                     show: false,
                  },
                  zoom: {
                     enabled: false,
                  },
               },
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  width: [2, 2],
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  curve: "straight",
               },
               legend: {
                  tooltipHoverFormatter: function (val, opts) {
                     return (
                        val +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex][
                           opts.dataPointIndex
                        ] +
                        ""
                     );
                  },
                  markers: {
                     // fillcolors: ["#F46B68", "#2BC155", "#FAEB00"],
                     width: 19,
                     height: 19,
                     strokeWidth: 0,
                     radius: 19,
                  },
               },
               markers: {
                  size: 6,
                  border: 0,
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  hover: {
                     size: 6,
                  },
               },
               xaxis: {
                  categories: seriesData,
               },
               yaxis: {
                  labels: {
                     style: {
                        colors: "#3e4954",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: 100,
                     },
                  },
               },
               fill: {
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  type: "solid",
                  opacity: 0.07,
               },
               grid: {
                  borderColor: "#f1f1f1",
               },
            },
         };
      } else if(props.props.clicked === "monthly" && ["HOS", "DN"].includes(role)){

         this.state = {
            series: [
               {
                  name: "Confirmed",
                  data: props.props.stats.MSConfirmed,
               },
               {
                  name: "Rejected",
                  data: props.props.stats.MSRejected,
               },
               {
                  name: "Pending",
                  data: props.props.stats.MSPending,
               },
            ],
            options: {
               chart: {
                  height: 350,
                  type: "area",
                  group: "social",
                  toolbar: {
                     show: false,
                  },
                  zoom: {
                     enabled: false,
                  },
               },
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  width: [2, 2],
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  curve: "straight",
               },
               legend: {
                  tooltipHoverFormatter: function (val, opts) {
                     return (
                        val +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex][
                           opts.dataPointIndex
                        ] +
                        ""
                     );
                  },
                  markers: {
                     fillcolors: ["#F46B68", "#2BC155", "#FAEB00"],
                     width: 19,
                     height: 19,
                     strokeWidth: 0,
                     radius: 19,
                  },
               },
               markers: {
                  size: 6,
                  border: 0,
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  hover: {
                     size: 6,
                  },
               },
               xaxis: {
                  categories: [
                     "January",
                     "February",
                     "March",
                     "April",
                     "May",
                     "June",
                     "July",
                     "August",
                     "September",
                     "October",
                     "November",
                     "December"
                  ],
               },
               yaxis: {
                  labels: {
                     style: {
                        colors: "#3e4954",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: 100,
                     },
                  },
               },
               fill: {
                  colors: ["#F46B68", "#2BC155", "#FAEB00"],
                  type: "solid",
                  opacity: 0.07,
               },
               grid: {
                  borderColor: "#f1f1f1",
               },
            },
         };
      }
   }

   render() {
      return (
         <div id="chart">
            <ReactApexChart
               options={this.state.options}
               series={this.state.series}
               type="area"
               height={400}
            />
         </div>
      );
   }
}

export default ApexLine;
