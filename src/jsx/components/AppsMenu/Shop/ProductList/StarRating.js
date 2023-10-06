import React from "react";
import {Rating} from "react-simple-star-rating";
import swal from "sweetalert";	
//import "./styles.css";

function StarRating() {
  return (
    <Rating
      initialValue={1}
      fillColor="#FF912C"
      emptyColor="#ccc"
      size={20}
      onClick={val => {
		switch(val) {
			case 1:
			return swal("Thank you for the 1 star rating.");
			case 2:
			return swal("Thank you for the 2 star rating.");
			case 3:
			return swal("Thank you for the 3 star rating.");
			case 4:
			return swal("Thank you for the 4 star rating.");
			case 5:
			return swal("Thank you for the 5 star rating.");
			default :
			return swal("Thank you for the 1 star rating.");
			
		}
      }}
	  
    />
  );
}
export default StarRating;

/* if(val===1){
		  alert("Thanks! You rated this 1 stars.");
		}else if(val===2){
			alert("Thanks! You rated this 2 stars.");
		}else if(val===3){
			alert("Thanks! You rated this 3 stars.");
		} */