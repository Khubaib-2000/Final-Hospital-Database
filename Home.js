import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Alpha National Hospital</h1>
      </header>
      <main className="home-content">
        {/* Sections */}
        <section className="section">
          <h2>Best Specialists</h2>
          <div className="grid-container">
            <div className="grid-item">
              <h3>Gynecologists</h3>
              <p>Top gynecologists offering expert care for women's health.</p>
            </div>
            <div className="grid-item">
              <h3>Physiotherapists</h3>
              <p>Rehabilitation services to help you recover and stay active.</p>
            </div>
            <div className="grid-item">
              <h3>Dentists</h3>
              <p>Experienced dentists for all your dental care needs.</p>
            </div>
            <div className="grid-item">
              <h3>Neurologists</h3>
              <p>Best Doctors to diagnose your Neurological Diseases.</p>
            </div>
            <div className="grid-item">
              <h3>Cardiologists</h3>
              <p>Best Doctors to take care of your heart.</p>
            </div>
            <div className="grid-item">
              <h3>Psycatrists</h3>
              <p>lorem23.</p>
            </div>
            <div className="grid-item">
              <h3>Oncologists</h3>
              <p>Lorem23.</p>
            </div>
            <div className="grid-item">
              <h3>Eye Specialists</h3>
              <p>Lorem23.</p>
            </div>

            <div className="grid-item">
              <h3>Gastroentologists</h3>
              <p>Lorem23.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Healthcare Procedures</h2>
          <div className="grid-container">
            <div className="grid-item">
              <h3>Cardiac Surgery</h3>
              <p>Advanced surgical procedures for heart-related conditions.</p>
            </div>
            <div className="grid-item">
              <h3>Orthopedic Surgery</h3>
              <p>Expert care for bones, joints, and musculoskeletal injuries.</p>
            </div>

            <div className="grid-item">
              <h3>Eye Surgery</h3>
              <p>Lorem 23.</p>
            </div>

            <div className="grid-item">
              <h3>Liver Surgery</h3>
              <p>Lorem12.</p>
            </div>

            <div className="grid-item">
              <h3>Brain Surgery</h3>
              <p>Lorem12.</p>
            </div>

            <div className="grid-item">
              <h3>Cancer Surgery</h3>
              <p>Lorem12.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Disease Treatment</h2>
          <div className="grid-container">
            <div className="grid-item">
              <h3>Arthirtes Treatment</h3>
              <p>lorem23.</p>
            </div>
            <div className="grid-item">
              <h3>Back Ache Treatment</h3>
              <p>orem23.</p>
            </div>

            <div className="grid-item">
              <h3>Abdomen Pain treatment</h3>
              <p>Lorem 23.</p>
            </div>

            <div className="grid-item">
              <h3>Chest Infection Treatment</h3>
              <p>Lorem12.</p>
            </div>

            <div className="grid-item">
              <h3>Vomitting Treatement</h3>
              <p>Lorem12.</p>
            </div>

            <div className="grid-item">
              <h3>Sleep Disorder Treatment</h3>
              <p>Lorem12.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
