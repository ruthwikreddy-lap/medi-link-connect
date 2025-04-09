
import {
  Patient,
  Provider,
  Appointment,
  Medication,
  HealthUpdate,
  MedicalRecord,
  Message,
  Task,
  EducationalResource
} from "../models/types";

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Jane Smith",
    dateOfBirth: "1985-06-15",
    gender: "Female",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Asthma"],
    contactPhone: "(555) 123-4567",
    contactEmail: "jane@example.com",
    emergencyContact: {
      name: "John Smith",
      relationship: "Husband",
      phone: "(555) 987-6543"
    },
    primaryCareProvider: "Dr. Michael Johnson"
  },
  {
    id: "p2",
    name: "Robert Martinez",
    dateOfBirth: "1972-09-23",
    gender: "Male",
    bloodType: "A-",
    allergies: ["Sulfa drugs"],
    conditions: ["Type 2 Diabetes", "High Cholesterol"],
    contactPhone: "(555) 234-5678",
    contactEmail: "robert@example.com",
    emergencyContact: {
      name: "Maria Martinez",
      relationship: "Wife",
      phone: "(555) 876-5432"
    },
    primaryCareProvider: "Dr. Sarah Williams"
  }
];

// Mock Providers
export const mockProviders: Provider[] = [
  {
    id: "d1",
    name: "Dr. Michael Johnson",
    specialty: "Internal Medicine",
    licenseNumber: "MD12345",
    department: "Primary Care",
    contactPhone: "(555) 111-2222",
    contactEmail: "dr.johnson@example.com",
    availability: ["Mon 9-5", "Wed 9-5", "Fri 9-1"]
  },
  {
    id: "d2",
    name: "Dr. Sarah Williams",
    specialty: "Cardiology",
    licenseNumber: "MD67890",
    department: "Cardiac Care",
    contactPhone: "(555) 333-4444",
    contactEmail: "dr.williams@example.com",
    availability: ["Tue 8-4", "Thu 8-4", "Fri 1-5"]
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    patientName: "Jane Smith",
    providerId: "d1",
    providerName: "Dr. Michael Johnson",
    dateTime: "2025-04-15T10:00:00",
    duration: 30,
    status: "scheduled",
    type: "Check-up",
    notes: "Annual physical examination"
  },
  {
    id: "a2",
    patientId: "p1",
    patientName: "Jane Smith",
    providerId: "d2",
    providerName: "Dr. Sarah Williams",
    dateTime: "2025-05-02T14:30:00",
    duration: 45,
    status: "scheduled",
    type: "Specialist Consultation",
    notes: "Discussion of recent blood pressure readings"
  },
  {
    id: "a3",
    patientId: "p2",
    patientName: "Robert Martinez",
    providerId: "d1",
    providerName: "Dr. Michael Johnson",
    dateTime: "2025-04-11T09:15:00",
    duration: 30,
    status: "scheduled",
    type: "Diabetes Follow-up"
  }
];

// Mock Medications
export const mockMedications: Medication[] = [
  {
    id: "m1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-12-01",
    instructions: "Take in the morning with food",
    prescribedById: "d1",
    refillInfo: {
      remaining: 15,
      lastFilled: "2025-03-15",
      pharmacy: "MediCare Pharmacy"
    }
  },
  {
    id: "m2",
    name: "Albuterol",
    dosage: "2 puffs",
    frequency: "As needed",
    startDate: "2024-10-15",
    instructions: "Use for acute asthma symptoms",
    prescribedById: "d1",
    refillInfo: {
      remaining: 3,
      lastFilled: "2025-02-20",
      pharmacy: "MediCare Pharmacy"
    }
  },
  {
    id: "m3",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2024-08-05",
    instructions: "Take with morning and evening meals",
    prescribedById: "d1",
    refillInfo: {
      remaining: 30,
      lastFilled: "2025-03-25",
      pharmacy: "QuickScript Pharmacy"
    }
  }
];

// Mock Health Updates
export const mockHealthUpdates: HealthUpdate[] = [
  {
    id: "h1",
    date: "2025-04-02T08:30:00",
    type: "vital",
    title: "Blood Pressure Reading",
    description: "Morning measurement",
    value: "128/82",
    unit: "mmHg"
  },
  {
    id: "h2",
    date: "2025-04-05T14:45:00",
    type: "lab",
    title: "HbA1c Results",
    description: "Quarterly diabetes check",
    value: "6.4",
    unit: "%",
    status: "Review required"
  },
  {
    id: "h3",
    date: "2025-04-07T10:15:00",
    type: "medication",
    title: "Refill Reminder",
    description: "Albuterol inhaler running low",
    status: "Action needed",
    relatedToId: "m2"
  }
];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "p1",
    category: "lab",
    title: "Complete Blood Count",
    date: "2025-03-15",
    providerId: "d1",
    providerName: "Dr. Michael Johnson",
    content: "All values within normal range except slight elevation in white blood cells.",
    attachments: ["lab-report.pdf"]
  },
  {
    id: "mr2",
    patientId: "p1",
    category: "prescription",
    title: "Lisinopril Prescription",
    date: "2024-12-01",
    providerId: "d1",
    providerName: "Dr. Michael Johnson",
    content: "10mg daily for blood pressure management",
    status: "active"
  },
  {
    id: "mr3",
    patientId: "p1",
    category: "imaging",
    title: "Chest X-ray",
    date: "2024-11-10",
    providerId: "d2",
    providerName: "Dr. Sarah Williams",
    content: "No significant findings. Lungs clear.",
    attachments: ["xray-image.jpg"]
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "p1",
    senderName: "Jane Smith",
    senderRole: "patient",
    recipientId: "d1",
    recipientName: "Dr. Michael Johnson",
    timestamp: "2025-04-01T09:23:00",
    content: "I've been experiencing increased shortness of breath when exercising. Should I adjust my medication?",
    read: true
  },
  {
    id: "msg2",
    senderId: "d1",
    senderName: "Dr. Michael Johnson",
    senderRole: "provider",
    recipientId: "p1",
    recipientName: "Jane Smith",
    timestamp: "2025-04-01T14:05:00",
    content: "Thank you for letting me know. Please monitor your symptoms and use your rescue inhaler as needed. Let's discuss this at your upcoming appointment next week.",
    read: true
  },
  {
    id: "msg3",
    senderId: "d2",
    senderName: "Dr. Sarah Williams",
    senderRole: "provider",
    recipientId: "p1",
    recipientName: "Jane Smith",
    timestamp: "2025-04-06T11:30:00",
    content: "Your recent lab results look good. Continue with your current medication regimen, and we'll reassess at your next visit.",
    read: false
  }
];

// Mock Tasks for Providers
export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Review Jane Smith's lab results",
    description: "Check CBC and metabolic panel from 04/05",
    assignedToId: "d1",
    assignedById: "d2",
    patientId: "p1",
    dueDate: "2025-04-08T17:00:00",
    priority: "high",
    status: "pending",
    category: "Lab Review"
  },
  {
    id: "t2",
    title: "Complete Robert Martinez's referral",
    assignedToId: "d1",
    assignedById: "d1",
    patientId: "p2",
    dueDate: "2025-04-10T12:00:00",
    priority: "medium",
    status: "in-progress",
    category: "Administrative"
  },
  {
    id: "t3",
    title: "Update department protocols",
    description: "Incorporate new hypertension guidelines",
    assignedToId: "d1",
    assignedById: "d1",
    dueDate: "2025-04-14T17:00:00",
    priority: "low",
    status: "pending",
    category: "Administrative"
  }
];

// Mock Educational Resources
export const mockEducationalResources: EducationalResource[] = [
  {
    id: "e1",
    title: "Managing Hypertension: Lifestyle Modifications",
    description: "Learn about diet, exercise, and other lifestyle changes to help control high blood pressure.",
    category: ["Hypertension", "Wellness"],
    contentType: "article",
    url: "/resources/hypertension-lifestyle",
    tags: ["blood pressure", "diet", "exercise", "stress management"],
    createdAt: "2025-01-15",
    updatedAt: "2025-03-02"
  },
  {
    id: "e2",
    title: "Understanding Your Asthma Medications",
    description: "A comprehensive guide to different types of asthma medications and how to use them effectively.",
    category: ["Asthma", "Medications"],
    contentType: "video",
    url: "/resources/asthma-medications",
    tags: ["asthma", "inhalers", "medication management"],
    createdAt: "2025-02-10"
  },
  {
    id: "e3",
    title: "Diabetes Self-Care Essentials",
    description: "Essential information for daily diabetes management, including blood sugar monitoring and foot care.",
    category: ["Diabetes", "Self-Care"],
    contentType: "infographic",
    url: "/resources/diabetes-self-care",
    tags: ["diabetes", "blood sugar", "foot care", "nutrition"],
    createdAt: "2025-03-05"
  }
];

// Export specific patient and provider data for current user examples
export const currentPatient = mockPatients[0];
export const currentProvider = mockProviders[0];
