import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  sizes = "100vw",
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6" /%3E%3C/svg%3E';

  useEffect(() => {
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '200px',
        threshold: 0.01
      }
    );

    const element = document.getElementById(`lazy-img-${src}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      id={`lazy-img-${src}`}
      className={cn("relative overflow-hidden", containerClassName)}
      style={{ width: width || 'auto', height: height || 'auto' }}
    >
      {(isIntersecting || priority) && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          width={width}
          height={height}
          onLoad={handleLoad}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          sizes={sizes}
          {...props}
        />
      )}
      {(!isLoaded || !isIntersecting) && !priority && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
      <noscript>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          {...props}
        />
      </noscript>
    </div>
  );
};

export default LazyImage; 