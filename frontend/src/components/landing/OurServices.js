import { SquareKanban, HardHat, DraftingCompass } from 'lucide-react';

export default function OurServices() {
  return (
    <section className='py-16 bg-gray-100'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-8'>Our Services</h2>
        <p className='text-lg text-gray-700 mb-12'>
          From residential to commercial projects, Biba X Construction delivers
          exceptional construction solutions.
        </p>
        <div className='flex justify-around'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <span className='flex justify-center'>
              <SquareKanban />
            </span>
            <h3 className='text-xl font-bold mb-2'>Project Management</h3>
            <p>Efficient planning and execution to keep projects on track.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <span className='flex justify-center'>
              <HardHat />
            </span>
            <h3 className='text-xl font-bold mb-2'>Quality Construction</h3>
            <p>Building with precision and attention to detail.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <span className='flex justify-center'>
              <DraftingCompass />
            </span>
            <h3 className='text-xl font-bold mb-2'>Innovative Designs</h3>
            <p>Creative architectural solutions for modern living.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
