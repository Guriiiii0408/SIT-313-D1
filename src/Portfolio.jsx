function Portfolio() {
  return (
    <section id="work" className="portfolio">
      <h1>Here's what I've done so far</h1>

      <div className="projects">

        <div className="project-card">
         <img
          src="/BMI calculator.jpg"
          alt="BMI Calculator"
        />

        <h2>Project One</h2>
        <h3>BMI Calculator</h3>

        <p>
          This BMI Calculator was made by me.
        </p>
        </div>

        <div className="project-card">
         <img
          src="/Student registration.jpg"
          alt="Student Registration Form"
        />

        <h2>Project Two</h2>
        <h3>Student Registration Form</h3>

        <p>
          This Student Registration form was made by me.
        </p>
        </div>

      </div>
    </section>
  )
}

export default Portfolio