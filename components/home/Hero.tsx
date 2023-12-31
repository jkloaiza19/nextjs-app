import Image from "next/image"

const Hero = () => {
  return (
    <section className="hero min-h-full bg-base-200 pt-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image width={400} height={400} alt="hero" src="/images/hero.png" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  )
}

export default Hero