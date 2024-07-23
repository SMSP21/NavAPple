import React from 'react';
import { Card, CardContent, CardHeader, Alert, AlertTitle, Typography } from '@mui/material';
import { MapPin, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: { text: string }[];
}

interface FleetDashboardProps {
  imageOnLeft?: boolean;
  imageSrc?: string;
}

const FleetDashboard = ({ imageOnLeft = false, imageSrc = "./image.png" }: FleetDashboardProps) => {
  const ImageSection = () => (
    <div className="w-full md:w-1/2 relative h-[610px] pt-20">
      <div className="bg-green-800 w-[720px] h-[480px] overflow-hidden">
        <img src={imageSrc} alt="Satellite view" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-4 right-20 w-64 h-48 text-center bg-white p-3 rounded-lg shadow-lg border-b border-gray-800">
        <h3 className="font-bold text-black text-[20px] pt-1 mb-3">Route performance</h3>
        <div className="flex items-center mb-2 pl-3 pt-1">
          <span className="border border-green-500 rounded text-green-900 text-center font-semibold px-2 py-1 text-sm">ON TIME</span>
          <span className="text-gray-600 text-center text-lg pl-2">ETA 12:37pm</span>
        </div>
        <ul className="text-sm text-gray-600 pl-3 pt-2.5">
          <li className="flex items-center mb-3">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Traffic jam avoided
          </li>
          <li className="flex items-center mb-3">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Additional stop added
          </li>
        </ul>
      </div>
    </div>
  );

  const FeatureCard = ({ title, subtitle, description, features }: FeatureCardProps) => {
    return (
      <div className="bg-white rounded-xl h-[400px] p-6">
        <div className="flex items-center text-blue-500 mb-2 text-left">
          <MapPin className="w-6 h-6 mr-2" />
          <Typography variant="subtitle1" className="uppercase font-bold">
            {subtitle}
          </Typography>
        </div>
        <Typography variant="h5" className="font-bold text-[35px] text-black mb-6">
          {title}
        </Typography>
        <Typography className="text-gray-600 mb-8 text-md">
          {description}
        </Typography>
        <ul className="space-y-2 text-blue-500 border-gray-300 pt-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center hover:underline font-bold cursor-pointer mb-8 text-lg">
              {feature.text} <ArrowRight className="w-4 h-4 ml-1" />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const ContentSection = () => (
    <div className={`w-full md:w-1/3 min-h-[470px] pt-16 pl-5 ${!imageOnLeft ? 'md:ml-auto' : ''}`}>
      <FeatureCard
        title="Optimize fleet operations with real-time data."
        subtitle="Complete visibility"
        description="Samsara's to-the-second GPS and vehicle diagnostics give you best-in-class visibility to improve route performance, fleet efficiency, and customer service."
        features={[
          { text: 'GPS fleet & trailer tracking' },
          { text: 'Remote vehicle diagnostics' },
        ]}
      />
      <ul className='border-t border-gray-800 shadow-inner pl-5'></ul>
  
      <Alert className="mt-4 bg-green-50 border-green-200 h-28 pl-5">
        <AlertTitle className="font-semibold text-green-800 mb-6">99% ON-TIME DELIVERY</AlertTitle>
        <div className="flex items-center">
          <img src="/api/placeholder/24/24" alt="GP Transco logo" className="w-6 h-6 mr-2" />
          <span className="text-green-700">GP TRANSCO</span>
        </div>
      </Alert>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white">
      {imageOnLeft ? (
        <>
          <ImageSection />
          <ContentSection />
        </>
      ) : (
        <>
          <ContentSection />
          <ImageSection />
        </>
      )}
    </div>
  );
};

export default FleetDashboard;
