import React from 'react';

const AboutUs = () => {
  const aboutUsContent = {
    title: 'About Us',
    subtitle: 'Empowering Farmers, Enriching Lives',
    description:
      'Revolutionary Farmers is dedicated to transforming agriculture through secure and transparent escrow services. Our mission is to support farmers and buyers by providing a trustworthy platform for transactions, ensuring fair trade and sustainability in the agricultural sector.',
    mission: {
      title: 'Our Mission',
      content:
        'To empower farmers with financial security and create a seamless, transparent agricultural marketplace that benefits all stakeholders.',
    },
    vision: {
      title: 'Our Vision',
      content:
        'To revolutionize the agricultural industry by fostering trust, efficiency, and sustainability through innovative escrow solutions.',
    },
    values: {
      title: 'Our Core Values',
      list: ['Transparency', 'Trust', 'Sustainability', 'Innovation', 'Empowerment'],
    },
  };

  return (
    <section className="bg-gradient-to-br from-green-200 via-white to-green-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">{aboutUsContent.title}</h2>
          <h3 className="mt-2 text-2xl text-green-700 font-medium">{aboutUsContent.subtitle}</h3>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">{aboutUsContent.description}</p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Mission Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-green-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              {aboutUsContent.mission.title}
            </h4>
            <p className="text-gray-700">{aboutUsContent.mission.content}</p>
          </div>

          {/* Vision Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-green-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              {aboutUsContent.vision.title}
            </h4>
            <p className="text-gray-700">{aboutUsContent.vision.content}</p>
          </div>

          {/* Values Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-green-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              {aboutUsContent.values.title}
            </h4>
            <ul className="space-y-2">
              {aboutUsContent.values.list.map((value, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-700">
                  <span className="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
