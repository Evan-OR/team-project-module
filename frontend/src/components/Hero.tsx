import React from 'react'
import heroStyles from '../styles/heroStyles.module.scss'

const Hero = () => {
    return(
    <div className={heroStyles.Container}>
        <div className={heroStyles.paragraphContainer}>
        <h1 className={heroStyles.Header}>About us</h1>
        <p className={heroStyles.paragraphContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea distinctio tempora dolor eaque, delectus corrupti, obcaecati mollitia voluptates expedita fuga tempore, officia beatae explicabo! Amet molestias incidunt vel debitis exercitationem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea distinctio tempora dolor eaque, delectus corrupti, obcaecati mollitia voluptates expedita fuga tempore, officia beatae explicabo! Amet molestias incidunt vel debitis exercitationem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea distinctio tempora dolor eaque, delectus corrupti, obcaecati mollitia voluptates expedita fuga tempore, officia beatae explicabo! Amet molestias incidunt vel debitis exercitationem?</p>
        </div>
    </div>
    )
}

export default Hero
