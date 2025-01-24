const useAnalytics = () => {
    const trackEvent = (eventName: string, data?: Record<string, any>) => {
      console.log(`Analytics Event: ${eventName}`, data);
      // Here you can integrate tools like Google Analytics, Mixpanel, etc.
    };
  
    return { trackEvent };
  };
  
  export default useAnalytics;
  