import { create } from "zustand";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Stethoscope,
} from "lucide-react";

// Icon mapping helper
const iconMap = {
  Building2: Building2,
  GraduationCap: GraduationCap,
  Stethoscope: Stethoscope,
  Briefcase: Briefcase,
};

export const useChatModalStore = create((set) => ({
  isChatOpen: false,

  openChat: () => set({ isChatOpen: true }),

  closeChat: () => set({ isChatOpen: false }),

  toggleChat: () =>
    set((state) => ({ isChatOpen: !state.isChatOpen })),

  isContactModalOpen: false,

  openContactModal: () => set({ isContactModalOpen: true }),

  closeContactModal: () => set({ isContactModalOpen: false }),

  // Plans state
  plans: [],
  isLoadingPlans: false,
  plansError: null,

  // Set plans from API
  setPlans: (packages) => {
    const transformedPlans = packages.map((pkg) => ({
      id: pkg.id,
      icon: iconMap[pkg.icon] || Building2, // Default to Building2 if icon not found
      title: pkg.title,
      titleEn: pkg.titleEn,
      duration: pkg.duration,
      price: pkg.priceText || `$${pkg.price.toLocaleString()}`,
      originalPrice: pkg.originalPrice,
      discountedPrice: pkg.discountedPrice,
      hasDiscount: pkg.hasDiscount,
      discountPercentage: pkg.discountPercentage,
      campaignEndDate: pkg.campaignEndDate,
      campaignName: pkg.campaignName,
      description: pkg.description,
      features: pkg.features || [],
      popular: pkg.popular || false,
      gradient: pkg.gradient || "from-blue-500 to-purple-500",
      longDescription: pkg.longDescription || "",
      benefits: pkg.benefits || [],
      requirements: pkg.requirements || [],
      process: pkg.process || [],
      contactRequired: pkg.contactRequired || false,
    }));
    set({ plans: transformedPlans, isLoadingPlans: false });
  },

  setLoadingPlans: (loading) => set({ isLoadingPlans: loading }),

  setPlansError: (error) =>
    set({ plansError: error, isLoadingPlans: false }),

  // Selected plan
  selectedPlan: {},
  setSelectedPlan: (data) => set({ selectedPlan: data }),
}));
