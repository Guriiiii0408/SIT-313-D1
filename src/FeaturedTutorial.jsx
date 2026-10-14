const tutorials = [
  {
    name: "Arduino and Led work",
    description: "Learn How arduino works with Led",
    rating: 10,
    username: "Gurshaan",
    image: "/Led.jpg"
  },
  {
    name: "Parking sensor",
    description: "Using Tinker cad to make Parking sensor.",
    rating: 10,
    username: "Gurshaan",
    image: "/Tinker card.jpg"
  },
  {
    name: "Wifi Home Appliances working",
    description: "Learn how Wifi-enabled home appliances work",
    rating: 10,
    username: "Gurshaan",
    image: "/Home Appliances.jpg"
  }
]

function FeaturedTutorial() {
  return (
    <section className="featured-tutorials font-bold">
      <h1 className="text-4xl">Featured Tutorials</h1>

      <div className="tutorial-grid">
        {tutorials.map((tutorial) => (
          <div className="tutorial-card" key={tutorial.name}>

            <img
              src={tutorial.image}
              alt={tutorial.name}
            />

            <h2>{tutorial.name}</h2>

            <p>{tutorial.description}</p>

            <p>Rating: {tutorial.rating}</p>

            <p>By: {tutorial.username}</p>

          </div>
        ))}
      </div>

      <button type="button" className="block mx-auto mt-6 px-6 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-600 transition">
        See all tutorials
      </button>
    </section>
  )
}

export default FeaturedTutorial