/* eslint-disable react/prop-types */
import "./ProjectContent.css"

function ProjectContent(props){
    return(
        <div className="project-content">
            <p className="project-content__img-desc">{props.imgDesc}</p>
            <div style={{ backgroundImage: `url(${props.imgUrl})`,height:`${props.imgUrl==undefined? 'auto':'600px'}` }} className="project-content__img"></div>
            <p className="project-content__text">{props.imgTxt}</p>
        </div>
    )
}

export default ProjectContent