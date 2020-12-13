import React,{Fragment} from 'react';
import './about.css'

function About(){
    return(
        <Fragment>
            <div className="tag-line">  
                <h3 className="heading">Our goal is to make online education <br /> available for everyone.</h3>
            </div>
            <br/>
            <div className="about-us">
                <h2 className="heading-about-us">About Us</h2>
                <br/>
                <p className="para-about-us">
                The main aim of building this was to get all the best tutorials at one place so that each learner can visit here, get some good resources of the programming language and learn. Coding Hunt lets learners identify the most suitable course of their choice.
                </p>
            </div>
        </Fragment>
    )
}

export default About;