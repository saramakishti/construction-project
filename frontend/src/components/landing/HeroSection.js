export default function HeroSection() {
  return (
    <header
      className='relative h-screen flex items-center justify-center text-white overflow-hidden'
      style={{
        backgroundImage: "url('/images/banner.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className='relative z-10 w-full h-full flex flex-col justify-center items-center text-center text-white p-4'>
        <h1 className='text-5xl font-bold mb-4'>
          Building the Future, One Brick at a Time
        </h1>
        <p className='text-xl mb-8'>
          High-quality construction for modern living and commercial spaces
        </p>
      </div>
    </header>
  );
}
