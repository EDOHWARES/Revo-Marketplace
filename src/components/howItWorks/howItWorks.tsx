import React, { useState } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Steps {
  farmers: Step[];
  buyers: Step[];
}

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'farmers' | 'buyers'>('farmers');

  const steps: Steps = {
    farmers: [
      {
        number: 1,
        title: 'List Your Produce',
        description: 'Add your produce details and pricing to our marketplace.',
      },
      {
        number: 2,
        title: 'Secure Orders',
        description: 'Receive orders via secure smart contracts.',
      },
      {
        number: 3,
        title: 'Verify & Ship',
        description: 'Confirm quality and ship products safely.',
      },
      {
        number: 4,
        title: 'Receive Payments',
        description: 'Get paid automatically through blockchain transactions.',
      },
    ],
    buyers: [
      {
        number: 1,
        title: 'Browse Marketplace',
        description: 'Explore verified farmers and high-quality products.',
      },
      {
        number: 2,
        title: 'Place an Order',
        description: 'Securely order with our easy-to-use payment system.',
      },
      {
        number: 3,
        title: 'Track Shipment',
        description: 'Follow your order in real-time from farm to table.',
      },
      {
        number: 4,
        title: 'Confirm & Rate',
        description: 'Confirm delivery and rate your experience.',
      },
    ],
  };

  const renderSteps = (stepsArray: Step[]) =>
    stepsArray.map((step) => (
      <div
        key={step.number}
        className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-green-200 hover:shadow-md transition-all duration-300"
      >
        {/* Placeholder for custom icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            {step.number}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{step.title}</h4>
          <p className="mt-1 text-gray-600">{step.description}</p>
        </div>
      </div>
    ));

  return (
    <section
      id="how-it-works"
      className="py-16 bg-gradient-to-br from-green-200 via-white to-green-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Explore the seamless process designed for both farmers and buyers.
          </p>
        </div>

        {/* Tabs for Farmers and Buyers */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            type="button"
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
              activeTab === 'farmers'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600 border border-green-600'
            }`}
            onClick={() => setActiveTab('farmers')}
          >
            For Farmers
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
              activeTab === 'buyers'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600 border border-green-600'
            }`}
            onClick={() => setActiveTab('buyers')}
          >
            For Buyers
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-6">{renderSteps(steps[activeTab])}</div>
      </div>
    </section>
  );
};

export default HowItWorks;
