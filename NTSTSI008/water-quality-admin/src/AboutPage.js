import React from 'react';
import Header from './Header'; // Import the shared header

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 to-blue-900 text-white">
      <Header /> {/* Use shared Header component */}

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About SeaClear</h1>
          <p className="text-lg mb-8">
            SeaClear is a cutting-edge web application designed to provide real-time water quality information for Cape Town's beaches. 
            By leveraging advanced technology, we aim to empower beachgoers with up-to-date safety information, enabling them to make informed decisions about their beach outings.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-8">
            At SeaClear, our mission is to foster a safe and enjoyable beach experience for everyone. We aim to raise public awareness about the importance of water quality, 
            and how it affects both human health and the environment. By providing accessible and reliable information, we hope to encourage proactive steps towards maintaining 
            cleaner and safer beaches.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Why Water Quality Matters</h2>
          <p className="mb-8">
            Water quality is a crucial indicator of environmental health. Poor water quality can have adverse effects on marine ecosystems, wildlife, and human health. 
            Exposure to contaminated water can lead to illnesses such as gastroenteritis, skin infections, and respiratory problems. SeaClear is committed to providing 
            accurate, real-time information that helps the community stay informed and safe.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
          <p className="mb-8">
            SeaClear uses a combination of data science, real-time monitoring, and community engagement to offer comprehensive water quality information. 
            Our platform aggregates data from multiple sources, including official reports and user-submitted observations, to deliver a holistic view of water conditions 
            across Cape Town's beaches. Our advanced algorithms analyze this data to generate easy-to-understand safety ratings, helping users stay informed with minimal effort.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="flex justify-center items-center flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-8">
            <TeamMember
              name="Alex Mabuza"
              role="Project Lead & Full Stack Developer"
              description="Alex is the driving force behind SeaClear, bringing years of experience in software development and project management to the team."
            />
            <TeamMember
              name="Tsianda Netsianda"
              role="Backend Developer & Data Analyst"
              description="Tsianda specializes in data processing and backend development, ensuring the seamless integration of complex datasets into SeaClear."
            />
            <TeamMember
              name="Sachen Pather"
              role="Frontend Developer & UI/UX Designer"
              description="Sachen is responsible for the intuitive design and user experience of SeaClear, making sure the platform is both accessible and visually appealing."
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <p className="mb-8">
            We believe in the power of community engagement. Whether you're a beachgoer, environmentalist, or simply someone who cares about water safety, there are many ways 
            to get involved with SeaClear. Share your own water quality observations, participate in community discussions, or contribute to our ongoing development efforts. 
            Together, we can make Cape Town's beaches safer and more enjoyable for everyone.
          </p>
        </div>
      </main>
    </div>
  );
};

const TeamMember = ({ name, role, description }) => (
  <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <p className="text-lg font-semibold mb-2">{role}</p>
    <p className="text-sm text-gray-300">{description}</p>
  </div>
);

export default AboutPage;
