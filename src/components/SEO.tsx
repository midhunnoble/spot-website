import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, schema }) => {
  React.useEffect(() => {
    // Update Title
    document.title = title;

    // Update Canonical URL
    const baseUrl = 'https://spotmicroschool.in';
    const path = window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}${path}`);

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update JSON-LD Schema
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // We don't necessarily want to remove the title/meta on unmount 
      // as they should be replaced by the next page's SEO component.
      // But removing the script is good to avoid multiple schemas.
      const scriptToRemove = document.getElementById('json-ld-schema');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [title, description, schema]);

  return null;
};

export default SEO;
