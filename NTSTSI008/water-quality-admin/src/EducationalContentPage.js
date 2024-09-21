import { Droplet, Leaf, Shield } from 'lucide-react';
import React from 'react';
import Header from './Header'; // Import the shared header

const EducationalContentPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> {/* Use shared Header component */}

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <EducationCard
            icon={<Droplet className="w-12 h-12 text-blue-500" />}
            title="Understanding Water Quality"
            content="Learn about the factors that affect water quality and how it's measured. Understand the importance of clean water for both human health and marine ecosystems."
          />
          <EducationCard
            icon={<Shield className="w-12 h-12 text-green-500" />}
            title="Beach Safety Guidelines"
            content="Discover essential beach safety tips, including how to recognize and avoid rip currents, the importance of sun protection, and what different beach flags mean."
          />
          <EducationCard
            icon={<Leaf className="w-12 h-12 text-yellow-500" />}
            title="Environmental Conservation"
            content="Explore ways to protect our beaches and marine life. Learn about the impact of pollution on coastal ecosystems and how you can contribute to conservation efforts."
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Water Quality Explained</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">What Affects Water Quality?</h3>
            <p className="mb-4">
              Water quality can be influenced by various factors, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Rainfall and stormwater runoff</li>
              <li>Sewage and wastewater discharge</li>
              <li>Agricultural runoff</li>
              <li>Industrial pollution</li>
              <li>Natural phenomena like algal blooms</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">How is Water Quality Measured?</h3>
            <p>
              Water quality is typically assessed through various parameters, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Bacterial levels (e.g., E. coli)</li>
              <li>pH levels</li>
              <li>Dissolved oxygen</li>
              <li>Turbidity</li>
              <li>Presence of nutrients and pollutants</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How You Can Help</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="mb-4">
              Everyone can play a role in maintaining beach cleanliness and protecting our coastal environments. Here are some ways you can contribute:
            </p>
            <ul className="list-disc pl-6">
              <li>Participate in beach clean-up events</li>
              <li>Properly dispose of trash and recycle when possible</li>
              <li>Use reef-safe sunscreen to protect marine life</li>
              <li>Conserve water to reduce runoff and wastewater</li>
              <li>Educate others about the importance of beach conservation</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

const EducationCard = ({ icon, title, content }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
    <p className="text-gray-600">{content}</p>
  </div>
);

export default EducationalContentPage;
