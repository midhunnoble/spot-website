import React from 'react';

interface SkeletonProps {
  className?: string; 
  variant?: 'rectangular' | 'circle' | 'text';
}

export const Skeleton = ({ className = '', variant = 'rectangular' }: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-spot-charcoal/5 dark:bg-white/5";
  const variantClasses = {
    rectangular: "rounded-2xl",
    circle: "rounded-full",
    text: "rounded-md h-4 w-full"
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
};

export const StudioSkeleton = () => (
  <div className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-xl space-y-6">
    <Skeleton className="h-64 w-full" />
    <div className="space-y-3">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
  </div>
);
