'use client';

import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = forwardRef((props, ref) => {
  return (
    <div className="bg-white shadow-sm border-r border-stone-200 h-full overflow-hidden" ref={ref}>
      <div className="relative w-full h-full">
        <img 
          src={props.image} 
          alt="Article Page" 
          className="w-full h-full object-cover" 
          draggable="false"
        />
        <div className="absolute bottom-2 right-4 text-[10px] text-stone-400 font-mono">
          {props.number}
        </div>
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default function ArticleFlipbook({ pages }) {
  return (
    <div className="flex justify-center items-center py-10 overflow-hidden cursor-pointer select-none">
      <HTMLFlipBook 
        width={400} 
        height={550} 
        size="stretch"
        minWidth={300}
        maxWidth={600}
        minHeight={400}
        maxHeight={800}
        maxShadowOpacity={0.5} 
        
        // UPDATED: This forces the book to start open (Spread View)
        showCover={false} 
        
        mobileScrollSupport={true}
        className="" 
      >
        {pages.map((imgUrl, index) => (
          <Page key={index} number={index + 1} image={imgUrl} />
        ))}
      </HTMLFlipBook>
    </div>
  );
}