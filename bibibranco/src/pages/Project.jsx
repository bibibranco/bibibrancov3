import Header from "../components/Header/Header"
import "./Project.css"
import ProjectContent from "./ProjectContent/ProjectContent"
import SideBar from "./SideBar.jsx/SideBar"
import { useParams } from 'react-router-dom';

let projetos = [
    {
        id:1,
        nome: 'Product Design', 
        description:'I’ve been working with end-to-end user experience design for the last four years, creating meaningful blablabla for global companies such as Itau Unibanco, Melhor Envio, AEDIT',
        content:[
            {
                imgUrl: '../img01.jpg',
                imgDesc: 'abuble',
                imgTxt: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            },
            {
                imgUrl: '../img01.jpg',
                imgDesc: 'desc2',
                imgTxt: `Lorem Ipsum ainda é is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            },
    ]
    },
    {
        id:2,
        nome: 'Crafting', 
        description:'muita cerveja e coca cola zero envolvidathe last four years, creating meaningful blablabla for global companies such as Itau Unibanco, Melhor Envio, AEDIT',
        content:[{
            imgUrl: '../img01.jpg',
            imgDesc: 'abuble',
            imgTxt: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        }]
    },
]

function Project(){
    const { projectId } = useParams();
    const projeto = projetos.find((projeto) => projeto.id === parseInt(projectId));
    
    return(
        <div className="project-container-wrapper">        
            <div className="project-header-container">
                <Header></Header>
            </div>
            <div className="project-body-container">
                <SideBar title={projeto.nome} description={projeto.description} />
                <div className="project-body-container__content">
                    {projeto.content.map((content, index) => (
                <ProjectContent
                    key={index} // Use um identificador único, como o índice neste caso
                    imgUrl={content.imgUrl}
                    imgDesc={content.imgDesc}
                    imgTxt={content.imgTxt}
                />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Project