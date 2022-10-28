import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import './githubCalendar.css';

const Github = () => {
  return (
    <section>
      <h5>GitHub Calander</h5>
      <h2>My GitHub Stats and Current Strek </h2>
      <div className="container github_calendar">
        <GitHubCalendar username="sks-7" />
      </div>
      <div>
        <img
          src="https://github-readme-stats.vercel.app/api?username=sks-7&show_icons=true&theme=dark&title_color=FDA117&text_color=F2E9DB"
          alt=""
          style={{ width: '400px', display: 'block', margin: 'auto' }}
        />
        <img
          src="https://streak-stats.demolab.com?user=sks-7&theme=dark"
          alt=""
          style={{ width: '400px', display: 'block', margin: 'auto' }}
        />
      </div>
    </section>
  );
};

export default Github;
