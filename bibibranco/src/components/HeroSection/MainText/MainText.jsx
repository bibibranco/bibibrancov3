import './MainText.css' 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MainText = () => {
  const [textIndex, setTextIndex] = useState(0);

  const textsArray = ['create stuff','build interfaces', 'build furniture', 'love spreadsheets'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textsArray.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [textsArray]);


  return (
    <>
      <div className='container-main-text'>
        <div className='container-main-text__div'>
          <h1 className='container-main-text__text'>Hey there! I'm Bibi Branco  <br/> and I&nbsp;
            <motion.span  className='container-main-text__anim'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}>
                            {textsArray[textIndex]}
            </motion.span>
          </h1>
        </div>
      </div>
    </>
  )
}

export default MainText
