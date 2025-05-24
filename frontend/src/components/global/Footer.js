import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left px-4'>
        <div>
          <h4 className='text-2xl font-semibold mb-6'>Quick Links</h4>
          <ul className='space-y-4'>
            <li>
              <a href='/' className='hover:text-blue-500'>
                Home
              </a>
            </li>
            <li>
              <a href='/about' className='hover:text-blue-500'>
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='text-2xl font-semibold mb-6'>Contact Us</h4>
          <ul className='space-y-4'>
            <li className='flex items-center justify-center md:justify-start'>
              <MapPin className='w-6 h-6 mr-3 text-blue-500' />
              <span>Autostrada Tiranë-Rinas, km. 12, 1000, Albania</span>
            </li>
            <li className='flex items-center justify-center md:justify-start'>
              <Phone className='w-6 h-6 mr-3 text-blue-500' />
              <span>+355 123 456 789</span>
            </li>
            <li className='flex items-center justify-center md:justify-start'>
              <Mail className='w-6 h-6 mr-3 text-blue-500' />
              <span>info@bibax.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-2xl font-semibold mb-6'>Our Location</h4>
          <div className='rounded-lg overflow-hidden shadow-lg'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47881.415393030344!2d19.66515825879269!3d41.40474293117435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13502c4d8e14227d%3A0x92c16879aa946786!2sEpoka%20University!5e0!3m2!1sen!2sde!4v1747087441342!5m2!1sen!2sde'
              width='100%'
              height='200'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>

      <div className='text-center mt-8 border-t border-gray-700 pt-6'>
        <p>&copy; 2025 Biba X Construction. All rights reserved.</p>
      </div>
    </footer>
  );
}
