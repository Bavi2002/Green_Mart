import React from 'react'

import './Home.css'
import hero_image from '../Components/assets/hero_image.png'
import boarding1 from '../Components/assets/boarding1.png'
import boarding2 from '../Components/assets/boarding2.png'
import boarding3 from '../Components/assets/boarding3.png'
const home = () => {
  return (
    <div>
    <div className="container">
      <header className="header">
        <div>
        <h1>Healthy Choices, Happy Planet</h1>
        <p>Make a positive impact with every purchase. Choose products that care for you and the world.</p>
        <button className="get-started-btn">Get Started</button>
        <div className="customer-reviews">
          <p>Our happy customers</p>
          <p>★ 4.8 (450+ reviews)</p>
        </div>
        <div>
          <img src={hero_image} alt=""/>
        </div>
        
        </div>
      </header>

      <section className="what-we-do">
        <h2>WHAT WE DO</h2>
        <p>We help thousands of people being healthy</p>
        <div className="services">
          <div className="service-item">
          <img src={boarding1} alt=""></img>
            <p>Quality Recipes</p>
          </div>
          <div className="service-item">
          <img src={boarding2} alt=""></img>
            <p>Save on Groceries</p>
          </div>
          <div className="service-item">
          <img src={boarding3} alt=""></img>
            <p>Zero Food Waste</p>
          </div>
        </div>
      </section>

      <section className="customer-feedback">
        <h2>WHAT THEY SAY</h2>
        <p>What our customers say about us?</p>
        <div className="feedback-cards">
          <div className="feedback-card">
            <p>"I used to throw away veggies that were about to expire. Now I save money and reduce food waste."</p>
            <p>- Jessica from Canada ★★★★☆</p>
          </div>
          <div className="feedback-card">
            <p>"I feel that I eat out less and get better at cooking by using their easy websites."</p>
            <p>- Mark from USA ★★★★★</p>
          </div>
          <div className="feedback-card">
            <p>"It's easy to use! I love that I can select my ingredients."</p>
            <p>- Sophia from India ★★★★☆</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <p>Are you ready to fight against food waste?</p>
        <button className="join-now-btn">Join Now</button>
      </section>
    </div>
    </div>
  );
};


export default home