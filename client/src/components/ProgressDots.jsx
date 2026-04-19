import React from "react";

const ProgressDots = () => {
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="bg-primary h-[4px] w-10 rounded-full" />
      <div className="bg-primary/40 h-[4px] w-3 rounded-full" />
      <div className="bg-primary/20 h-[4px] w-2 rounded-full" />
    </div>
  );
};

export default ProgressDots;
