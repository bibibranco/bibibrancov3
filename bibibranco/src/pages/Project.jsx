import Header from "../components/Header/Header"
import "./Project.css"
import ProjectContent from "./ProjectContent/ProjectContent"
import SideBar from "./SideBar.jsx/SideBar"
import { useParams } from 'react-router-dom';

let projetos = [
    {
        id:1,
        nome: 'product design', 
        description:'I’ve been working with end-to-end user experience design for the last five years, creating and collaborating with global companies such as Itau Unibanco, Melhor Envio, and AEDIT. Bringing meaningful impact to users through constant iteration and research are some of the things I like the most about my role.',
        content:[
            {
                imgUrl: '../aedit.jpg',
                imgDesc: 'AEDIT',
                imgTxt: `Being the sole designer leading a complete= application redesign, my responsbilities ranged from listening to people from several areas in the company (from the CEO to marketing individual contributors), understanding their pains, their audience, and their goals; showing low-fidelity proposals to solve their problems; researching; and finally coming up with a new, straightforward, user-friendly -- and technically feasible -- interface.`,
            },
            {
                imgDesc: 'Thomé',
                imgUrl: '../thome.jpg',
                imgTxt: `Covid-19 affected the way kids access education and enlarged the gap between private and public schools in Brazil. This app was conceived as the final project for my Design undergrad – its main goal was to create an experience that was already familiar to most users.`,

            },
            {
                imgUrl: '../random.jpg',
                imgDesc: 'other projects',
                imgTxt: `I have also designed experiences for real life applications, experimental workshops, and my own projects and ideas from time to time. My goal is to continue sharing skills I've developed while doing so and learning by collaborating with people from different areas and backgrounds.`,

            }
    ]
    },
    {
        id:2,
        nome: 'crafting', 
        description:'woodworking, cutting glass, graphic design and a pile of different hobbies collected throughout the years',
        content:[{
            imgUrl: '../woodworking.jpg',
            // imgDesc: 'abuble',
            imgTxt: `I recently rediscovered my passion for working with tangible things. It is my way of touching grass after working in front of screens for the whole day. My grandfather taught me how to grow and care for plants, how to build benches, and how to cut glass, which was his trade. Only after his passing and spending some time at ITP's shop I made piece with that side of me, and after coming back home and setting up my own shop, I'm now proudly exhibiting several pieces I built myself around my place.`,
        }]
    },
    {
        id:3,
        nome: 'data viz', 
        description:'creating spreadsheets and turning the collected data into visual assets is one of my passions        ',
        content:[{
            imgUrl: '../mapping.jpg',
            // imgDesc: 'abuble',
            imgTxt: `By aligning my design background and projection mapping skills I could create a visual representation by quantifying and qualifying my human interactions during the ITP camp. During 20 days I kept record of how many interactions I had on each day, while also observing my overall mood and other external factors, such as having a pre-drink before going to camp or not.`,
            },
            {
            // imgUrl: '../mapping.jpg',
            // imgDesc: 'abuble',
            imgTxt: `I kept a spreadsheet by logging the number of interactions I had each day of ITP Camp while also keeping track of other personal data to understand if there was any direct correlation between the number of people I talked to in a day and how I felt each day.
            `,
            },
            {
            imgUrl: '../1D6A3859.jpg',
            // imgDesc: 'abuble',
            imgTxt: `Those insights were turned into 3D prisms, each one represented one day of camp, building a physical chart where the Y axis represented the days of camp and the X axis the number of interactions per day.
            `,
            },
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