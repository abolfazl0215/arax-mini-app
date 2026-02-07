// hooks/usePackages.js
import { useEffect } from 'react';
import { useChatModalStore } from '@/store/chatModalStore';
import { fetchPackages } from '@/api/packages';

export const usePackages = () => {
  const { plans, isLoadingPlans, plansError, setPlans, setLoadingPlans, setPlansError } = useChatModalStore();

  useEffect(() => {
    const loadPackages = async () => {
      // Skip if already loaded
      if (plans.length > 0) return;

      setLoadingPlans(true);
      try {
        const response = await fetchPackages();
        if (response.success && response.packages) {
          setPlans(response.packages);
        }
      } catch (error) {
        console.error('Failed to load packages:', error);
        setPlansError(error.message || 'خطا در بارگذاری پکیج‌ها');
      }
    };

    loadPackages();
  }, [plans.length, setPlans, setLoadingPlans, setPlansError]);

  return {
    plans,
    isLoadingPlans,
    plansError,
    refetch: async () => {
      setLoadingPlans(true);
      try {
        const response = await fetchPackages();
        if (response.success && response.packages) {
          setPlans(response.packages);
        }
      } catch (error) {
        setPlansError(error.message || 'خطا در بارگذاری پکیج‌ها');
      }
    }
  };
};