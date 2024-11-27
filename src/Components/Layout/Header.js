import { Fragment } from "react";
import  "./Header.css"
import foodImage from "../../assets/image1.jpg";
import HeaderCartButton from "./HeaderCartButton";


function Header(props) {
    return (
         <Fragment>
                <header className="header">
                  <h1>Hotel Dayro Food</h1>
                  <HeaderCartButton onClick= {props.onShowCart}/>
                </header>
                <div className="main-image">
                   <img src={foodImage} alt="A dish of gujrati food"/>
                </div>
         </Fragment>
    )
};

export default Header;