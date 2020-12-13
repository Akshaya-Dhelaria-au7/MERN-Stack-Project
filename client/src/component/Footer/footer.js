import React from 'react';
import {Link,Route,Switch} from 'react-router-dom'
import About from '../About/about';
import './footer.css'

function Footer(){
    return(
        <div className="footer-component">
            <p className="footer">Coding Hunt
                <i className="fa fa-copyright"></i>
            {
                <Link to='/about' className="about-footer" >About</Link>
            }
            </p>
            <Switch>
                <Route path='/about' exact component={About}/>
            </Switch>
        </div>
    )
}

export default Footer;