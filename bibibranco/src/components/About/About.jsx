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

        <ul>

        <li><Experience text1='Itaú Unibanco' text2='2022 – present' text3='mid-level product designer'></Experience></li>
        <li><Experience text1='Melhor Envio' text2='2020 – 2022' text3='junior/mid-level product designer'></Experience></li>
        <li><Experience text1='Agência Ursa' text2='2018 – 2020' text3='designer'></Experience></li>

        </ul>

        <h1>education</h1>

        <ul>

          <li><Experience text1='Graphic Design Degree' text2='2017 – 2022' text3='bachalor’s degree @ Universidade Federal de Pelotas'></Experience></li>
          <li><Experience text1='ITP Camp' text2='june 2023' text3='NYU summer program'></Experience></li>
          <li><Experience text1='Programming For All' text2='2020' text3='@Le Wagon'></Experience></li>

        </ul>

      </div>

    </div>


    </>
  )
}

export default About
