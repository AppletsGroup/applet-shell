import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full py-3">
      <FaSpinner className="animate-spin mr-2" />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;