import './App.css'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import Timeline from './components/Timeline/Timeline'

function App() {

  return (
    <>
      <div>
        <Header></Header>
        <HeroSection></HeroSection>
        <Timeline></Timeline>
        <About></About>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
