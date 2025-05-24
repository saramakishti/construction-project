import { testimonials } from '@/config';
import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className='py-16 bg-gray-100'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-12'>What Our Clients Say</h2>
        <div className='flex justify-around gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='bg-white p-8 rounded-lg shadow-lg hover:shadow-xl'
            >
              <div className='flex flex-col items-center mb-6'>
                <div className='w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4'>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={96}
                    height={96}
                    className='object-cover w-full h-full'
                  />
                </div>
                <h3 className='text-xl font-semibold'>{testimonial.name}</h3>
                <p className='text-gray-500'>{testimonial.role}</p>
              </div>
              <p className='text-gray-700 italic'>"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
