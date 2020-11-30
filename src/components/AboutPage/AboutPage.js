import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AboutPage.css';


const AboutPage = () => (
  <div className="container">
    <div className="container shadow-lg rounded">
      <div className="about-block shadow-lg rounded"> 
        <h2>Where ItsNuts Can Go</h2>
        <p>ItsNuts is a custom nut-mix buiilder, to further this project I would like to implement more customization of a given nut mix(ex.dynamically syncing proportions)</p>
        <p>Adding an image GUI for a representation of what a mix would look like while building</p>
        <p>Add images to item inventory of what those nuts look like to make the user feel engaged and not just staring at words</p>
      </div>
      <div className="about-block shadow-lg rounded"> 
        <h2>Technologies Used:</h2>
        <p>React</p>
        <p>Redux</p>
        <p>Node.js</p>
        <p>Express</p>
        <p>Bootstrap</p>
        <p>Material UI</p>
      </div>
      <div className="about-block shadow-lg rounded"> 
        <h2>Thank You</h2>
        <p>Mom & Dad</p>
        <p>Friends</p>
        <p>Instructors</p>
        <p>Ukkonen Cohort</p>
      </div>
      {/* <div>
        <h3>Get in touch with me:</h3>
        <FontAwesomeIcon icon='fab fa-linkedin-in'/>
        <i class="fab fa-linkedin-in"></i>
      </div> */}
    </div>
  <img id='bg' src='https://images.creativemarket.com/0.1.0/ps/6250485/1820/971/m1/fpnw/wm1/w4h4o53wfbcdghwjqwiqkb2xfxitq9m7mpinlxlr9sjqkbblrryyrjefhhk5am92-.jpg?1555299851&s=c9b3b6079bebb429999f41d123767bf0'></img>
  </div>
);

export default AboutPage;
