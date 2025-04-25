
import { useEffect, useState } from 'react';

// Animation to fade in elements when they become visible in viewport
export const useFadeInOnScroll = (threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const hiddenElements = document.querySelectorAll('.fade-in-element');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [threshold]);
};

// Hook for staggered animations of elements
export const useStaggeredAnimation = (
  selector: string,
  baseDelay = 100,
  animationClass = 'animate-fade-in-up'
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.classList.add(animationClass);
      }, baseDelay * index);
    });
    
    return () => {
      elements.forEach((el) => {
        el.classList.remove(animationClass);
      });
    };
  }, [selector, baseDelay, animationClass]);
};

// Hook for lazy loading images with blur effect
export const useLazyLoadImage = (
  src: string, 
  placeholderSrc: string = '/placeholder.svg'
) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return { 
    src: imageSrc, 
    isLoaded: imageLoaded,
    style: !imageLoaded ? { filter: 'blur(10px)', transition: 'filter 0.3s ease-out' } : { transition: 'filter 0.3s ease-out' }
  };
};

// Hook for smooth scroll to anchor links
export const useSmoothScroll = (offset = 80) => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.hash && 
        anchor.hash.startsWith('#') && 
        anchor.href.includes(window.location.pathname)
      ) {
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
          
          history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [offset]);
};

// Hook for parallax scroll effect
export const useParallax = (
  elementRef: React.RefObject<HTMLElement>, 
  speed = 0.5
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const scrollTop = window.scrollY;
      const elementTop = elementRef.current.offsetTop;
      const distance = scrollTop - elementTop;
      
      if (distance > -window.innerHeight && distance < window.innerHeight) {
        const translateY = distance * speed;
        elementRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, speed]);
};
