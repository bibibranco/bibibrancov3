import './About.css' 
import SectionTitle from '../SectionTitle/SectionTitle'
import me from '../../assets/me.png'
import Experience from './Experience/Experience'

 

function About() {

  return (
    <>

    <div className='containerAboutMe'>
        <SectionTitle type="primary" text="about me">
        </SectionTitle>
    </div>

    <div className='contentAboutMe'>
      <img src={me}></img>

      <div className='sectionAboutMe'>

        <h1>professional experience</h1>

        <li>

          <Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience>
          <Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience>
          <Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience>

        </li>

        <h1>professional experience</h1>

        <li>

          <Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience>
          <Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience>
          <Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience>

        </li>

      </div>

    </div>


    </>
  )
}

export default About
