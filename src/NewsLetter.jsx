function Newsletter() {
  return (
    <section className="newsletter">
      <h2>Sign up for our daily newsletter</h2>

      <form>
        <input
          type="email"
          placeholder="Enter your email address"
        />

        <button type="submit">
          Subscribe
        </button>
      </form>
    </section>
  )
}

export default Newsletter