import React from 'react';

const CategoryBadge = ({ name }) => {
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-default`}>
      {name}
    </span>
  );
};

export default CategoryBadge;
