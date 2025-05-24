import { teamMembers } from '@/config';

export default function OurTeam() {
  return (
    <div className='container mx-auto text-center py-16'>
      <h3 className='text-4xl font-bold mb-12'>Meet Our Team</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12'>
        {teamMembers.map((member, index) => {
          const Icon = member.icon;
          return (
            <div
              key={index}
              className='bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl'
            >
              <div className='mb-4'>
                <Icon className='w-16 h-16 text-blue-600 mx-auto mb-4' />
              </div>
              <h4 className='text-2xl font-semibold text-blue-600 mb-2'>
                {member.name}
              </h4>
              <p className='text-gray-600 font-medium mb-4'>{member.role}</p>
              <p className='text-gray-700 text-sm leading-relaxed'>
                {member.bio}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
