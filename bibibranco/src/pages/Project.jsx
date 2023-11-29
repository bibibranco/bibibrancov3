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
    {
        id:3,
        nome: 'data viz', 
        description:'creating spreadsheets and turning the collected data into visual assets is one of my passions        ',
        content:[{
            imgUrl: '../img01.jpg',
            imgDesc: 'abuble',
            imgTxt: `By aligning my design background and projection mapping skills I could create a visual representation by quantifying and qualifying my human interactions during the ITP camp. During 20 days I kept record of how many interactions I had on each day, while also observing my overall mood and other external factors, such as having a pre-drink before going to camp or not.`,
            },
            {
            imgUrl: '../img01.jpg',
            imgDesc: 'abuble',
            imgTxt: `I kept a spreadsheet by logging the number of interactions I had each day of ITP Camp while also keeping track of other personal data to understand if there was any direct correlation between the number of people I talked to in a day and how I felt each day.
            `,
            }
            // {
            // imgUrl: '../img01.jpg',
            // imgDesc: 'abuble',
            // imgTxt: `Those insights were turned into 3D prisms, each one represented one day of camp, building a physical chart where the Y axis represented the days of camp and the X axis the number of interactions per day.
            // `,
            // }
            // {
            // imgUrl: '../img01.jpg',
            // imgDesc: 'abuble',
            // imgTxt: `While the main data was presented as physical shapes, the projected data on each day revealed the emotional reflections of those interactions. 
            // `,
            // }
    ]
    }
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