function AuthorProfile() {
  return (
    <section id="about" className="bg-white rounded-lg p-8 mt-8 text-center">
      <h2 className="text-2xl font-semibold mb-6">
        Author Profile
      </h2>

      <img
        src="/f91440ba-3880-400f-9547-413c8577ceee.jpg"
        alt="Author profile"
        className="w-32 h-32 object-cover rounded-full border-2 border-black mx-auto"
      />

      <p className="mt-6">
        I am a student and aspiring web developer at Deakin University.
        <br />
        I enjoy playing 8-ball pool and badminton. I also like to listen music.
      </p>
    </section>
  )
}

export default AuthorProfile