import React from 'react';

const Features = () => {
  return (
    <section className="content-box">
      <h2>Why ShowTracker?</h2>
      
      <article className="feature-grid">
        <section>
          <h3>One List to Rule Them All</h3>
          <p>Spreadsheets are for accountants. Notes apps are for groceries. ShowTracker is for the content you love. We bring every show from every service into a single source of truth. It's a clean, visual web app designed to do one thing perfectly: organize your TV life.</p>
        </section>
        
        <section>
          <h3>What You Can Do</h3>
          <ul>
            <li><strong>Build Your Library:</strong> Easily add any show to your "Watched," "Watching," or "Want to Watch" lists.</li>
            <li><strong>Automatic Show Details:</strong> Just type a show's name. We'll automatically pull in the poster, summary, and season info.</li>
            <li><strong>Personal Ratings:</strong> Give shows a rating from 1 to 5 stars.</li>
            <li><strong>Always In Sync:</strong> Your list is saved to your personal account, so it's available on any device, anytime.</li>
          </ul>
        </section>
      </article>
    </section>
  );
}

export default Features;