import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
export default class SpinnerPage extends React.Component {
 //other logic
   render() {
    return(
     <Loader
        type="ThreeDots"
        color="#a277f6"
        height={100}
        width={100}
     />
    );
   }
}