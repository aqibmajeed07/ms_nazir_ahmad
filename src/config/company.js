/**
 * Central Company Configuration & Single Source of Truth
 * Verified against official government certificates and statutory documents.
 */

export const companyConfig = {
  // Identity
  companyName: "M/S Nazir Ahmad Mir",
  shortName: "Nazir Ahmad Mir",
  proprietor: "Nazir Ahmad Mir",
  tagline: "Building with experience. Delivering with confidence.",
  subTagline: "A Class government registered contractor delivering civil construction, private and institutional buildings, Jal Shakti drinking water schemes, and power distribution across Jammu & Kashmir.",

  // Core Verified Credentials
  contractorClass: "A Class Contractor",
  experienceYears: "18+",
  experienceLabel: "18+ Years of Field Experience",
  projectCount: "15+",
  projectsLabel: "15+ Completed Works",
  complianceRate: "100%",
  complianceLabel: "Statutory & Quality Compliance",

  // Global Verified Office Address
  address: {
    line1: "Approach Road, Railway Budgam",
    city: "Budgam",
    district: "Budgam",
    state: "Jammu & Kashmir",
    pincode: "191111",
    region: "Jammu & Kashmir",
    full: "Approach Road, Railway Budgam, Jammu & Kashmir 191111",
    registeredYard: "Approach Road, Railway Budgam, Jammu & Kashmir"
  },

  // Contact Channels — Real Confirmed Details
  phone: "+91 7006080901",
  phoneRaw: "7006080901",
  secondaryPhones: ["+91 9622735483", "+91 7006690591"],
  email: "nmir2242@gmail.com",
  whatsapp: "+917006080901",
  whatsappDisplay: "+91 7006080901",
  whatsappMessage: "Hello, I would like to enquire about a construction project.",
  officeTimings: "Monday – Saturday: 9:00 AM – 6:00 PM",

  // Government Registration & Department Details (Public & Verifiable)
  registration: {
    department: "Jal Shakti (P.H.E) Kashmir & PW(R&B) Department",
    registrationNo: "SE/Hyd/Bud/2007-08/AAY/Upga/7/Civil/Sanitary",
    class: "A Class Contractor",
    issueDate: "01/04/2025",
    validity: "31 March 2027",
    verificationPortal: "https://jkpwdoms.jk.gov.in",
    portalName: "J&K PWDOMS Portal"
  },

  // GST & Business Registrations
  gstin: "01ALRPM6932B1ZA",
  gstinPortal: "https://services.gst.gov.in",

  // Udyam MSME Registration (Ministry of MSME, Govt of India)
  udyamRegistration: {
    number: "UDYAM-JK-04-0058024",
    type: "Micro Enterprise",
    activity: "Civil Engineering Projects (NIC 42909)",
    dateOfRegistration: "26/09/2026",
    dic: "District Industries Centre, Budgam (J&K)",
    path: "/documents/Udyam-Registration-Certificate.pdf"
  },

  // ESIC Statutory Registration
  esic: {
    code: "19000337770000999",
    office: "Regional Office, ESI Corporation, Jammu",
    path: "/documents/ESIC-Registration-Certificate.pdf"
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services", type: "services-dropdown" },
    { label: "Selected Works", href: "#projects", type: "projects-dropdown" },
    { label: "Documents", href: "#documents" },
    { label: "CAD Drafting", href: "#cad-work" },
    { label: "Gallery", href: "#gallery" },
    { label: "Ratings", href: "#ratings" },
    { label: "Contact", href: "#contact" }
  ],

  // Approved Public Documents (Strictly Public & Safe — Zero Personal Data)
  documents: [
    {
      id: "doc-brochure",
      title: "Company Profile & Capability Statement",
      shortTitle: "Company Brochure",
      description: "Official 14-page corporate profile detailing technical capabilities, field leadership, equipment staging, and project delivery credentials.",
      category: "Corporate Profile",
      department: "M/S Nazir Ahmad Mir",
      validity: "Current Edition",
      path: "/documents/company-brochure.pdf",
      fileName: "MS-Nazir-Ahmad-Mir-Brochure.pdf",
      fileSize: "18.8 MB",
      icon: "FileText",
      highlight: true
    },
    {
      id: "doc-contractor-license",
      title: "Class A Contractor Registration",
      shortTitle: "A Class License",
      description: "Official contractor registration certificate issued by Jal Shakti (P.H.E) Department Kashmir for civil and sanitary engineering works.",
      category: "Government License",
      department: "Jal Shakti (PHE) Kashmir",
      validity: "Valid through 31 March 2027",
      regNo: "SE/Hyd/Bud/2007-08/AAY/Upga/7",
      path: "/documents/A-Class-Contractor-Registration.pdf",
      fileName: "A-Class-Contractor-Registration.pdf",
      fileSize: "155 KB",
      icon: "Award",
      highlight: true
    },
    {
      id: "doc-udyam-msme",
      title: "Udyam MSME Registration Certificate",
      shortTitle: "MSME Registration",
      description: "Government of India Ministry of MSME enterprise registration for civil engineering and construction infrastructure works.",
      category: "Enterprise Certificate",
      department: "Ministry of MSME, Govt of India",
      validity: "Permanent Registration",
      regNo: "UDYAM-JK-04-0058024",
      path: "/documents/Udyam-Registration-Certificate.pdf",
      fileName: "Udyam-Registration-Certificate.pdf",
      fileSize: "228 KB",
      icon: "ShieldCheck",
      highlight: false
    },
    {
      id: "doc-gst-registration",
      title: "GST Registration Certificate (Form GST REG-06)",
      shortTitle: "GSTIN Certificate",
      description: "Official Goods and Services Tax registration certificate issued by the Government of India under regular proprietorship constitution.",
      category: "Tax Registration",
      department: "Goods and Services Tax, Govt of India",
      validity: "Active Regular Standing",
      regNo: "01ALRPM6932B1ZA",
      path: "/documents/GST-Registration-Certificate.pdf",
      fileName: "GST-Registration-Certificate.pdf",
      fileSize: "90 KB",
      icon: "FileCheck",
      highlight: false
    },
    {
      id: "doc-esic-registration",
      title: "ESIC Statutory Coverage Intimation",
      shortTitle: "ESIC Registration",
      description: "Employees' State Insurance Corporation statutory compliance and employer code registration for site and workforce social security.",
      category: "Statutory Compliance",
      department: "ESI Corporation, Regional Office Jammu",
      validity: "Active Employer Coverage",
      regNo: "Code 19000337770000999",
      path: "/documents/ESIC-Registration-Certificate.pdf",
      fileName: "ESIC-Registration-Certificate.pdf",
      fileSize: "105 KB",
      icon: "Building",
      highlight: false
    }
  ],

  // Website Developer Credit & Contact Details (Per Prompt Requirement 12 & 13)
  developer: {
    name: "Aqib Majeed",
    role: "Website & UI/UX Developer",
    phone: "9103696238",
    phoneTel: "tel:9103696238",
    linkedin: "https://www.linkedin.com/in/aqibmajeed07/",
    bio: "Full-stack web developer specializing in performant, modern digital experiences and accessible interfaces."
  },

  // Company Brand Assets
  logoImage: "/images/company_logo.jpg",
  ownerPhoto: "/images/owner_photo.png"
};

export default companyConfig;
