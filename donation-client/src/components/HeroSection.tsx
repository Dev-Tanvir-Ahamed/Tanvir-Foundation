const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=60')`,
      }}
      dark:bg-dark-background
      dark:text-dark-text
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white p-6 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Help Rebuild Lives After Disaster
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your donation can bring hope and relief to those affected by
          disasters.
        </p>
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold transition duration-300 ease-in-out">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
