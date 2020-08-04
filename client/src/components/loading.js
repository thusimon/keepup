import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000">
        <g>
          <g>
            <path d="M990,515.8c-1.3-66-15.6-131.9-42.1-192.1c-26.4-60.3-64.7-114.8-111.7-159.9c-47-45.1-102.7-80.8-163-104.4c-60.3-23.6-125-34.9-189.1-33.6c-64,1.3-127.8,15.2-186,40.9c-58.3,25.6-111.2,62.7-154.8,108.2c-43.7,45.5-78.2,99.5-100.9,157.8c-22.8,58.3-33.7,121-32.3,183c1.3,62,14.8,123.6,39.6,180c24.8,56.4,60.7,107.5,104.8,149.7c44.1,42.2,96.3,75.6,152.7,97.5c56.4,22,117,32.5,177,31.1c60-1.3,119.5-14.4,173.9-38.4c54.5-24,103.8-58.8,144.6-101.4c40.8-42.6,72.9-93.1,94.1-147.6c12.9-33,21.6-67.6,26.2-102.5c1.2,0.1,2.5,0.1,3.7,0.1c34.9,0,63.2-28.3,63.2-63.2c0-1.8-0.1-3.5-0.2-5.3L990,515.8L990,515.8z M889.5,683.7c-23.2,52.6-56.8,100.2-98,139.5c-41.2,39.3-89.9,70.3-142.5,90.7c-52.6,20.4-108.9,30.1-164.8,28.7c-55.9-1.3-111.2-13.6-161.8-36c-50.6-22.4-96.5-54.8-134.3-94.5c-37.9-39.7-67.7-86.7-87.2-137.4C81.2,623.9,72,569.7,73.3,515.8c1.3-53.9,13.2-107.1,34.8-155.8c21.6-48.7,52.8-92.8,91.1-129.2c38.3-36.4,83.5-65.1,132.2-83.8c48.7-18.8,100.9-27.7,152.7-26.3c51.9,1.3,103,12.8,149.7,33.6c46.8,20.8,89.2,50.9,124.1,87.7c35,36.8,62.4,80.3,80.4,127.1c18,46.8,26.5,96.9,25.1,146.7h0.2c-0.1,1.7-0.2,3.5-0.2,5.3c0,32.6,24.7,59.4,56.4,62.8C913.8,618.3,903.6,651.9,889.5,683.7L889.5,683.7z"/>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Loading;