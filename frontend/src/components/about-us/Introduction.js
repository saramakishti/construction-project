import { Goal, Telescope, Users } from 'lucide-react';

export default function Introduction() {
  return (
    <section className='py-16 bg-gray-100'>
      <div className='container mx-auto text-center'>
        <h2 className='text-4xl font-bold mb-8'>About Biba X Construction</h2>
        <p className='text-lg text-gray-700 mb-12'>
          At Biba X, we are dedicated to transforming construction ideas into
          reality. With a passionate team of engineers, architects, and project
          managers, we bring decades of experience and innovation to every
          project.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <span className='flex justify-center'>
              <Goal />
            </span>
            <h3 className='text-xl font-bold mb-2'>Our Mission</h3>
            <p>
              To deliver high-quality, sustainable construction solutions that
              meet the needs of our clients.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <span className='flex justify-center'>
              <Telescope />
            </span>
            <h3 className='text-xl font-bold mb-2'>Our Vision</h3>
            <p>
              Building the future, one brick at a time, with a focus on quality,
              safety, and innovation.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <span className='flex justify-center'>
              <Users />
            </span>
            <h3 className='text-xl font-bold mb-2'>Our Team</h3>
            <p>
              A diverse group of professionals with a shared commitment to
              excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
