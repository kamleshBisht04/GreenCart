import React from 'react'

const Loader = () => {
  return (
    <div className="relative min-h-[400px]">
      <div className="flex min-h-[300px] items-center justify-center py-10">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Loader
