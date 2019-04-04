import React from 'react';

/**
 * @description AboutAH - About Authors Haven component for Landing Page view
 * @returns {JSX} - JSX component
 */
const AboutAH = () => (
  <section className="segment about">
    <h3 className="segment__title">How Authors Haven works</h3>
    <p className="segment__text">Create and share your story with an amazing community of authors and avid readers.</p>
    <div className="steps">
      <div className="step">
        <span className="step__number">1</span>
        <span className="step__title">Write</span>
        <span className="step__text">Share your unique story with readers.</span>
      </div>
      <div className="step">
        <span className="step__number">2</span>
        <span className="step__title">Explore</span>
        <span className="step__text">Find stories from amazing authors.</span>
      </div>
      <div className="step">
        <span className="step__number">3</span>
        <span className="step__title">Connect</span>
        <span className="step__text">Engage with a community of writers.</span>
      </div>
    </div>
  </section>
);

export default AboutAH;
