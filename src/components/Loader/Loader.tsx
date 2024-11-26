import React from "react";
import { InfinitySpin } from 'react-loader-spinner'
 
interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    isLoading ? (
      <InfinitySpin
        width="200"           
        color="#4fa94d"       
         aria-label="infinity-spin-loading"  // Для доступности
      />
    ) : null
  )
}

export default Loader