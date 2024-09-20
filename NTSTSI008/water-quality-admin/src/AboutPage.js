import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white">
      <header className="bg-blue-500">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">SeaClear</Link>
          <Link to="/" className="bg-white text-blue-500 px-4 py-1 rounded-full hover:bg-blue-100 transition duration-300">
            Home
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About SeaClear</h1>
          <p className="text-lg mb-8">
            SeaClear is an innovative web application designed to provide real-time water quality information for Cape Town's beaches. 
            We aim to empower beachgoers with up-to-date safety information by processing and presenting data from official reports.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-8">
            We strive to raise public awareness about water quality, making the beach experience safer and more enjoyable for residents 
            and tourists alike. Our platform uses advanced algorithms to process complex data into simple, digestible water safety ratings.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <p>
            SeaClear was built by a passionate team of developers:
            <ul className="list-disc list-inside mt-4">
              <li>Sachen Pather</li>
              <li>Tsianda Netsianda</li>
              <li>Alex Mabuza</li>
            </ul>
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
