/**
 * Central Company Configuration & Single Source of Truth
 * Edit company details, contact channels, and links here.
 */

export const companyConfig = {
  // Identity
  companyName: "M/S Nazir Ahmad Mir",
  shortName: "Nazir Ahmad Mir",
  proprietor: "Nazir Ahmad Mir",
  tagline: "Building with experience. Delivering with care.",
  subTagline: "A Class government registered contractor undertaking civil, building, water supply, and electrical infrastructure works across Jammu & Kashmir.",

  // Core Verified Credentials
  contractorClass: "A Class Contractor",
  experienceYears: "18+",
  experienceLabel: "18+ Years of Experience",
  projectCount: "15+",
  projectsLabel: "15+ Projects Completed",
  complianceRate: "100%",
  complianceLabel: "Statutory & Quality Compliance",

  // Global Verified Office Address
  address: {
    line1: "Approach Road, Railway Budgam",
    region: "Jammu & Kashmir",
    full: "Approach Road, Railway Budgam, Jammu & Kashmir",
    city: "Budgam",
    state: "Jammu & Kashmir",
    country: "India",
    googleMapsUrl: "" // Leave empty if not mapped yet
  },

  // Contact Channels — Real Confirmed Details
  phone: "+91 7006080901",
  secondaryPhones: ["+91 9622735483", "+91 7006690591"],
  email: "nmir2242@gmail.com",
  whatsapp: "+917006080901",
  whatsappDisplay: "+91 7006080901",
  whatsappMessage: "Hello, I would like to enquire about a construction project.",
  officeTimings: "Monday – Saturday: 9:00 AM – 6:00 PM",

  // Government Registration & Verification Details (Optional / Verifiable)
  registration: {
    department: "Public Works (R&B) & Jal Shakti (PHE) Department",
    registrationNo: "SE/Hyd/Bud/2007-08/Upga/7/Civil/Sanitary",
    validity: "31 March 2027",
    verificationPortal: "https://jkpwdoms.jk.gov.in",
    portalName: "J&K PWDOMS Portal"
  },

  // Social & External Links (empty or clean defaults)
  socialLinks: {
    linkedin: "",
    facebook: "",
    twitter: "",
    instagram: ""
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services", type: "services-dropdown" },
    { label: "Selected Works", href: "#projects", type: "projects-dropdown" },
    { label: "Gallery", href: "#gallery" },
    { label: "CAD Drafting", href: "#cad-work" },
    { label: "Ratings", href: "#ratings" },
    { label: "Contact", href: "#contact" }
  ]
};

export default companyConfig;
