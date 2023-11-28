import './Contact.css' 
import SectionTitle from '../SectionTitle/SectionTitle'
import { ArrowSquareOut, At } from "@phosphor-icons/react";

 

function Contact() {

  return (
    <>

    <div className='wrapGetInTouch'>
    <div className='containerGetInTouch'>

    <SectionTitle type="secondary" text="get in touch">
        </SectionTitle>

      <p>say hi, invite me to collaborate on a project or just ask for my PSN so I can beat you on EAFC 24</p>

      <div className='linkFooter'>
        <a href='https://www.linkedin.com/in/bibibranco/' target='_blank'>linkedin<ArrowSquareOut size={24}/></a> 
        <a href='mailto: oi@bibibran.co' target='_blank'>oi@bibibran.co<At size={24}/> </a>

      </div>

    </div>
    </div>
    </>
  )
}

export default Contact
