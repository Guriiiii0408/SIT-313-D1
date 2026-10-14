const articles = [
  {
    title: "BMI Calculator",
    description: "A simple BMI calculator built with HTML, CSS, and JavaScript.",
    author: "Gurshaan",
    rating: 5,
    image: "/BMI calculator.jpg"
  },
  {
    title: "Student Registration Form",
    description: "Learn how to create a registration form using HTML and CSS",
    author: "Gurshaan",
    rating: 5,
    image: "/Student registration.jpg"
  },
  {
    title: "Tinkercad Project",
    description: "Explore important Tinkercad concepts",
    author: "Gurshaan",
    rating: 5,
    image: "/Tinkercad project.jpg"
  }
]

function FeaturedArticles() {
  return (
    <section className="featured-articles font-bold">
      <h1 className="text-4xl">Featured Articles</h1>

      <div className="article-grid">
        {articles.map((article) => (
          <div className="article-card" key={article.title}>

            <img
              src={article.image}
              alt={article.title}
            />

            <h2>{article.title}</h2>

            <p>{article.description}</p>

            <p>Rating: {article.rating}</p>

            <p>Author: {article.author}</p>

          </div>
        ))}
      </div>

      <button type="button" className="block mx-auto mt-6 px-6 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-600 transition">
        See all articles
      </button>
    </section>
  )
}

export default FeaturedArticles

