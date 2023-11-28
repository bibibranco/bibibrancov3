import Header from "../components/Header/Header"
import "./Project.css"
import SideBar from "./SideBar.jsx/SideBar"

function Project(){
    return(
        <>        
            <div className="project-header-container">
                <Header></Header>
            </div>
            <div className="project-body-container">
                <SideBar title="Product Design" description="I’ve been working with end-to-end user experience design for the last four years, creating meaningful blablabla for global companies such as Itau Unibanco, Melhor Envio, AEDIT" />
            </div>
        </>
    )
}
export default Project