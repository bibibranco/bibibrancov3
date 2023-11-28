/* eslint-disable react/prop-types */
import { ArrowCircleLeft } from "@phosphor-icons/react";
import "./SideBar.css"
import blueStar from "../../assets/star-blue.svg"
import { Link } from 'react-router-dom';

function SideBar(props){
    return(
        <div className="sideBar-container">        
            <div>
                <img src={blueStar} alt="blue star icon"></img>
                <h3 className="sideBar-container__title">{props.title}</h3>
                <p className="sideBar-container__txt">{props.description}</p>
            </div>
            <div>
                <Link to="/" className="backHomepage" >
                    <ArrowCircleLeft size={32} />
                    back to homepage
                </Link>
            </div>
        </div>
    )
}

export default SideBar