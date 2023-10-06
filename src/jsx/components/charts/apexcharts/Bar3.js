import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexBar3 = (props) => {
   const role = JSON.parse(localStorage.getItem("userDetails"))['role']
   var valuesConfirmed = [];
   var catConfirmed = [];
   var valuesRejected = [];
   try{
      if(props.props.stats.YSConfirmed !== undefined && props.props.stats.YSConfirmed !== null){
         valuesConfirmed = Object.values(props.props.stats.YSConfirmed)
         catConfirmed = Object.keys(props.props.stats.YSConfirmed)
      }
      if(props.props.stats.YSConfirmed !== undefined && props.props.stats.YSConfirmed !== null){
         valuesRejected = Object.values(props.props.stats.YSRejected)
      }
   }
   catch (error){
      console.log(error)
   }
      
   let series = [
      {
         name: "Number of appointments by year",
         data: valuesConfirmed,
      }
   ];
   let options = {
      chart: {
         type: "bar",
         toolbar: {
            show: false,
         },
      },
      plotOptions: {
         bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
         },
      },
      dataLabels: {
         enabled: false,
      },

      legend: {
         show: true,
         fontSize: "12px",
         fontWeight: 300,

         labels: {
            colors: "black",
         },
         position: "bottom",
         horizontalAlign: "center",
         markers: {
            width: 19,
            height: 19,
            strokeWidth: 0,
            radius: 19,
            strokeColor: "#fff",
            fillColors: ["#369DC9", "#D45BFF"],
            offsetX: 0,
            offsetY: 0,
         },
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
      stroke: {
         show: true,
         width: 2,
         colors: ["transparent"],
      },
      xaxis: {
         categories: catConfirmed,
      },
      fill: {
         colors: ["#369DC9", "#D45BFF"],
         opacity: 1,
      },
      tooltip: {
         y: {
            formatter: function (val) {
               return  val ;
            },
         },
      },
   };
   
   if(role === "DOC"){
      
   } else if(role in ["HOS", "DN"]){
      series.push(
         {
            
               name: "Number of Rejected appointments by year",
               data: valuesRejected,
            
         }
      )
   } 
  

   return (
      <ReactApexChart
         options={options}
         series={series}
         type="bar"
         height={350}
      />
   );
};

export default ApexBar3;
