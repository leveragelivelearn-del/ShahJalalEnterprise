export interface DetailedDoctor {
  name: string;
  slug: string;
  specialty: string;
  qualification: string;
  experience: string;
  image?: string;
  availableDays?: string;
}

export interface TreatmentPackage {
  title: string;
  price: number;
  description: string;
}

export interface BangladeshiGuideline {
  title: string;
  description: string;
  iconName: string;
}

export interface DetailedHospital {
  id?: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  address: string;
  image: string;
  logo?: string;
  departments: string[];
  advancedFacilities: string[];
  packages?: TreatmentPackage[];
  contactSupport?: string;
  bangladeshiGuidelines: BangladeshiGuideline[];
  doctors: DetailedDoctor[];
}

export const DETAILED_HOSPITALS: Record<string, DetailedHospital> = {
  'apollo-hospitals-chennai': {
    name: 'Apollo Hospitals, Chennai',
    slug: 'apollo-hospitals-chennai',
    description: 'Apollo Hospitals Chennai is the flagship medical institution of Apollo Hospitals Group, renowned worldwide for high-precision Cardiology, Oncology, Organ Transplants, and Orthopedics.',
    country: 'India',
    city: 'Chennai',
    address: '21, Greams Lane, Off Greams Road, Thousand Lights, Chennai, Tamil Nadu 600006, India',
    image: '/assets/images/hospitals/apollo_hospital_chennai.webp',
    departments: [
      'Cardiology & Robotic Cardiac Surgery',
      'Medical & Radiation Oncology (Proton Therapy)',
      'Organ Transplantation (Liver, Kidney, Heart)',
      'Neurology & Neurosurgery',
      'Orthopedics & Joint Replacement',
      'Gastroenterology & Hepatology'
    ],
    advancedFacilities: [
      'Proton Beam Therapy Center',
      'Da Vinci Robotic Surgical System',
      '320-Slice CT Scanner & 3T MRI',
      'Dedicated International Patient Lounge & Desk',
      'State-of-the-art Bone Marrow Transplant Unit'
    ],
    packages: [
      {
        title: 'Executive Full Body Health Checkup',
        price: 35000,
        description: 'Comprehensive screening including ECG, Lipid Profile, Liver Function, Kidney Profile, Chest X-Ray, Ultrasound, and Specialist Doctor Consultation.'
      },
      {
        title: 'Comprehensive Cardiac Evaluation',
        price: 45000,
        description: 'Detailed heart checkup including TMT (Treadmill Test), Echo, Cardiac CT Angiography, and Senior Cardiologist Consultation.'
      }
    ],
    contactSupport: '+880 1700-000000 / medical@shahjalalenterprise.com',
    bangladeshiGuidelines: [
      {
        title: 'Medical Visa Invitation Letter (VISA NOC)',
        description: 'Direct issuance of official Medical Visa Invitation Letter from Apollo Chennai within 24–48 hours for Indian High Commission Dhaka / Chittagong / Rajshahi visa submission.',
        iconName: 'FileText'
      },
      {
        title: 'Airport Receive & Local Transport',
        description: 'Free airport pick-up and drop-off service from Chennai International Airport (MAA) directly to hotel or hospital admission desk.',
        iconName: 'Car'
      },
      {
        title: 'Dedicated Bengali Speaking Interpreter',
        description: 'Assigned Bengali-speaking medical coordinator to assist with doctor appointments, medical report translations, and billing desk communication.',
        iconName: 'Languages'
      },
      {
        title: 'Hotel & Lodging around Greams Road',
        description: 'Pre-booked Bangladeshi food compliant hotels and apartments within 2-5 minutes walking distance from Apollo Greams Lane.',
        iconName: 'Home'
      },
      {
        title: 'Payment & Forex Assistance',
        description: 'Guidance on Endorsement of USD/INR, Bank T/T remittance for hospital bills, and hassle-free local payment desk support.',
        iconName: 'CreditCard'
      }
    ],
    doctors: [
      {
        name: 'Dr. K. M. Cherian',
        slug: 'dr-km-cherian',
        specialty: 'Cardiothoracic & Heart Transplant Surgeon',
        qualification: 'MBBS, MS, FRACS, D.Sc',
        experience: '38+ Years Experience',
        availableDays: 'Mon - Fri (By Appointment)'
      },
      {
        name: 'Dr. Raja Sundaram',
        slug: 'dr-raja-sundaram',
        specialty: 'Surgical Oncologist & Cancer Specialist',
        qualification: 'MBBS, MS, MCh (Oncology)',
        experience: '25+ Years Experience',
        availableDays: 'Mon - Sat'
      },
      {
        name: 'Dr. Madan Mohan Reddy',
        slug: 'dr-madan-mohan-reddy',
        specialty: 'Senior Joint Replacement Surgeon',
        qualification: 'MBBS, MS (Ortho), FRCS (UK)',
        experience: '22+ Years Experience',
        availableDays: 'Tue, Thu, Sat'
      }
    ]
  },
  'farrer-park-hospital': {
    name: 'Farrer Park Hospital',
    slug: 'farrer-park-hospital',
    description: 'Farrer Park Hospital in Singapore is a state-of-the-art tertiary hospital integrated with a 5-star hotel and medical center, offering high-end personalized healthcare, Minimally Invasive Surgery, and Advanced Oncology.',
    country: 'Singapore',
    city: 'Singapore',
    address: '1 Farrer Park Station Road, Singapore 217562',
    image: '/assets/images/hospitals/farrer_park_hospital_singapore.webp',
    departments: [
      'Cardiology & Vascular Interventions',
      'Oncology & Target Radiotherapy',
      'Orthopedics & Spine Surgery',
      'Gynecology & Fertility (IVF)',
      'Urology & Kidney Care',
      'Advanced Diagnostic Imaging'
    ],
    advancedFacilities: [
      'Integrated Operating Theaters with 4K Video Transmission',
      'Direct Connection to Farrer Park MRT Station',
      'Private Healing Gardens & Luxury Patient Suites',
      'Nuclear Medicine & PET-CT Scanner',
      '24/7 International Medical Concierge'
    ],
    packages: [
      {
        title: 'Premium Singapore Screening Package',
        price: 95000,
        description: 'Luxury diagnostic health screening including MRI/CT scan, Tumor Markers, Cardiac Profile, and Specialist Medical Consultation.'
      }
    ],
    contactSupport: '+880 1700-000000 / singapore@shahjalalenterprise.com',
    bangladeshiGuidelines: [
      {
        title: 'Singapore Medical Visa & Entry e-Pass',
        description: 'Express Singapore e-Visa authorization and hospital medical appointment confirmation letter for smooth airport immigration clearance.',
        iconName: 'FileText'
      },
      {
        title: 'Direct Airport Concierge & Transfer',
        description: 'Changi Airport meet-and-greet service with private luxury transfer directly to Farrer Park Hospital campus.',
        iconName: 'Car'
      },
      {
        title: 'Bengali & English Patient Liaison Specialist',
        description: 'Dedicated patient liaison manager assisting Bangladeshi families throughout treatment, prescription translation, and follow-ups.',
        iconName: 'Languages'
      },
      {
        title: 'Integrated Hotel Accommodation (One Farrer Hotel)',
        description: 'Seamless stay arrangements inside One Farrer Hotel directly connected to the hospital for family members and recovery.',
        iconName: 'Home'
      },
      {
        title: 'Singapore Dollar (SGD) Remittance & Insurance',
        description: 'Advisory for outward bank wire transfers from Bangladesh and international health insurance cashless clearance.',
        iconName: 'CreditCard'
      }
    ],
    doctors: [
      {
        name: 'Dr. Ruth Kam',
        slug: 'dr-ruth-kam',
        specialty: 'Senior Cardiologist & Electrophysiologist',
        qualification: 'MBBS (Singapore), MRCP (UK), FAMS',
        experience: '24+ Years Experience',
        availableDays: 'Mon - Fri'
      },
      {
        name: 'Dr. Lee Keat Seong',
        slug: 'dr-lee-keat-seong',
        specialty: 'Consultant Orthopedic & Spine Surgeon',
        qualification: 'MBBS, FRCS (Edinburgh), FAMS',
        experience: '20+ Years Experience',
        availableDays: 'Mon, Wed, Fri'
      }
    ]
  },
  'raffles-hospital': {
    name: 'Raffles Hospital',
    slug: 'raffles-hospital',
    description: 'Raffles Hospital is the flagship hospital of Raffles Medical Group in Singapore, accredited by JCI. It offers comprehensive multi-specialty medical services with over 30 specialist centers under one roof.',
    country: 'Singapore',
    city: 'Singapore',
    address: '585 North Bridge Road, Singapore 188770',
    image: '/assets/images/hospitals/raffles_hospital_singapore.webp',
    departments: [
      'Raffles Cancer Centre (Oncology & Hematology)',
      'Raffles Heart Centre',
      'Raffles Neuroscience Centre',
      'Raffles Children & Women Centre',
      'Raffles Orthopaedic & Joint Centre',
      'Raffles Dental & Aesthetic Centre'
    ],
    advancedFacilities: [
      'JCI Accredited Multi-Specialty Tertiary Care Center',
      'Hybrid Cardiac & Vascular Operating Theater',
      'Advanced Radiotherapy & Linear Accelerator',
      'VIP International Patient Suites',
      'In-house Pharmacy & Tele-consultation Network'
    ],
    packages: [
      {
        title: 'Raffles Executive Health Assessment',
        price: 88000,
        description: 'Comprehensive health checkup including Mammogram/Prostate Screening, Stress Echo, Ultrasound, Liver Profile, and Physician Consult.'
      }
    ],
    contactSupport: '+880 1700-000000 / singapore@shahjalalenterprise.com',
    bangladeshiGuidelines: [
      {
        title: 'Fast-Track Medical Visa Approval',
        description: 'Official Raffles Hospital appointment letter sent directly to Singapore High Commission Dhaka for priority medical visa issuance.',
        iconName: 'FileText'
      },
      {
        title: 'Changi Airport Chauffeur Service',
        description: 'Private vehicle pick-up from Changi Airport with direct check-in assistance at hospital VIP desk.',
        iconName: 'Car'
      },
      {
        title: 'Bengali Patient Ambassador & Coordinator',
        description: 'Personal Bengali-speaking patient ambassador assigned for the entire hospital stay to ensure clear doctor communication.',
        iconName: 'Languages'
      },
      {
        title: 'Nearby Apartment & Hotel Booking (Bugis Area)',
        description: 'Halal Bangladeshi food friendly hotels and serviced apartments located within 5 minutes of North Bridge Road.',
        iconName: 'Home'
      },
      {
        title: 'Direct Bank Wire & Currency Clearance',
        description: 'Full support with Bangladesh Bank outward medical treatment remittance permissions and SGD payment desk.',
        iconName: 'CreditCard'
      }
    ],
    doctors: [
      {
        name: 'Dr. Wong Seng Weng',
        slug: 'dr-wong-seng-weng',
        specialty: 'Consultant Medical Oncologist',
        qualification: 'MBBS (Singapore), MRCP (UK), FAMS',
        experience: '23+ Years Experience',
        availableDays: 'Mon - Fri'
      },
      {
        name: 'Dr. Chng Nai Leong',
        slug: 'dr-chng-nai-leong',
        specialty: 'Senior Consultant Neurosurgeon',
        qualification: 'MBBS (Singapore), FRCS (Edinburgh)',
        experience: '26+ Years Experience',
        availableDays: 'Tue - Sat'
      }
    ]
  },
  'bangkok-hospital': {
    name: 'Bangkok Hospital',
    slug: 'bangkok-hospital',
    description: 'Bangkok Hospital is Thailand’s premier private medical campus, featuring specialized centers including Bangkok Heart Hospital and Bangkok Cancer Hospital Wattanosoth, renowned for cutting-edge medical technology.',
    country: 'Thailand',
    city: 'Bangkok',
    address: '2 SOI PETCHBURI 47 YAK 10, PETCHBURI ROAD, BANGKOK 10310, THAILAND',
    image: '/assets/images/hospitals/bangkok_hospital_thailand.webp',
    departments: [
      'Wattanosoth Cancer Hospital (Advanced Oncology)',
      'Bangkok Heart Hospital',
      'Bangkok International Hospital (Neurology & Orthopedics)',
      'Gastroenterology & Liver Center',
      'Cosmetic & Plastic Surgery Center',
      'Rehabilitation & Physical Therapy'
    ],
    advancedFacilities: [
      'Wattanosoth Precision Cancer Care & CyberKnife',
      'Private Helipad & BDMS Emergency Medical Transport',
      'JCI Accredited International Patient Center',
      'Translator Service in over 30 Languages',
      'Luxury Medical Recovery Suites'
    ],
    packages: [
      {
        title: 'Bangkok Premier Executive Checkup',
        price: 52000,
        description: 'Full body screening including Coronary Calcium Scan, Whole Body Ultrasound, Tumor Markers, Hormone Profile, and Doctor Consultation.'
      }
    ],
    contactSupport: '+880 1700-000000 / thailand@shahjalalenterprise.com',
    bangladeshiGuidelines: [
      {
        title: 'Thailand Medical Visa (MT Visa) & Fit to Fly NOC',
        description: 'Official invitation documentation for Thai Embassy Dhaka medical visa application and hospital guarantee letter.',
        iconName: 'FileText'
      },
      {
        title: 'Suvarnabhumi Airport Pick-up & Ambulance Transfer',
        description: 'Dedicated airport lounge meet-and-greet at Bangkok Suvarnabhumi Airport (BKK) with free hotel/hospital transfer.',
        iconName: 'Car'
      },
      {
        title: 'Bangladeshi Patient Service Desk (Bengali Staff)',
        description: 'Dedicated Bangladeshi Desk inside Bangkok Hospital with full Bengali translator and coordinator support.',
        iconName: 'Languages'
      },
      {
        title: 'Halal Food & Hotel Stay around Soi Soonvijai',
        description: 'Special arrangements for Bangladeshi Halal food delivery and hotels near New Petchburi Road.',
        iconName: 'Home'
      },
      {
        title: 'Thai Baht (THB) / USD Financial Assistance',
        description: 'Guidance on USD endorsement, credit card transactions, and bank transfer support for hospital medical bills.',
        iconName: 'CreditCard'
      }
    ],
    doctors: [
      {
        name: 'Dr. Prasert Prasarttong-Osoth',
        slug: 'dr-prasert-prasarttong-osoth',
        specialty: 'Chief Senior Cardiologist',
        qualification: 'MD, FACC, FESC (USA & Thailand)',
        experience: '32+ Years Experience',
        availableDays: 'Mon - Fri'
      },
      {
        name: 'Dr. Thanongchai Siriwichayakul',
        slug: 'dr-thanongchai-siriwichayakul',
        specialty: 'Senior Surgical Oncologist',
        qualification: 'MD, Diploma Thai Board of Surgery',
        experience: '21+ Years Experience',
        availableDays: 'Mon, Wed, Sat'
      }
    ]
  }
};

export function getDetailedHospital(slug: string): DetailedHospital {
  const normalizedSlug = slug.toLowerCase();
  
  if (DETAILED_HOSPITALS[normalizedSlug]) {
    return DETAILED_HOSPITALS[normalizedSlug];
  }

  // Soft fallback for any unlisted slug
  return {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    slug: normalizedSlug,
    description: 'A world-class international healthcare facility offering advanced specialized diagnostic, surgical, and therapeutic treatments.',
    country: 'International',
    city: 'Medical Center',
    address: 'International Hospital Campus',
    image: '/assets/images/hospitals/apollo_hospital_chennai.webp',
    departments: ['General Medicine', 'Cardiology', 'Oncology', 'Orthopedics', 'Neurology'],
    advancedFacilities: ['24/7 International Emergency Unit', 'Advanced Diagnostic MRI/CT', 'Robotic Surgery Suite'],
    contactSupport: '+880 1700-000000 / medical@shahjalalenterprise.com',
    bangladeshiGuidelines: [
      {
        title: 'Medical Visa Invitation Letter',
        description: 'Full coordination for Medical Visa invitation letter from the hospital for embassy submission.',
        iconName: 'FileText'
      },
      {
        title: 'Airport Transfer & Lodging',
        description: 'Free airport pick-up and assistance with nearby hotel booking.',
        iconName: 'Car'
      },
      {
        title: 'Bengali Interpreter Support',
        description: 'Dedicated Bengali-speaking medical coordinator during doctor appointments.',
        iconName: 'Languages'
      },
      {
        title: 'Payment & Remittance Advisory',
        description: 'Guidance on outward bank wire transfer and USD/local currency clearance.',
        iconName: 'CreditCard'
      }
    ],
    doctors: [
      {
        name: 'Dr. Senior Medical Specialist',
        slug: 'dr-senior-specialist',
        specialty: 'Multi-specialty Chief Physician',
        qualification: 'MBBS, FCPS, FRCP',
        experience: '20+ Years Experience',
        availableDays: 'Mon - Fri'
      }
    ]
  };
}
