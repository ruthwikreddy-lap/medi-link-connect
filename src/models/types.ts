
// User related types
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  contactPhone: string;
  contactEmail: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  primaryCareProvider: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  licenseNumber: string;
  department: string;
  contactPhone: string;
  contactEmail: string;
  availability: string[];
}

// Healthcare related types
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  dateTime: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  type: string;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions: string;
  prescribedById: string;
  refillInfo?: {
    remaining: number;
    lastFilled: string;
    pharmacy: string;
  };
}

export interface HealthUpdate {
  id: string;
  date: string;
  type: "vital" | "lab" | "procedure" | "appointment" | "medication";
  title: string;
  description: string;
  value?: string;
  unit?: string;
  status?: string;
  relatedToId?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  category: "lab" | "prescription" | "diagnosis" | "imaging" | "procedure";
  title: string;
  date: string;
  providerId: string;
  providerName: string;
  content: string;
  attachments?: string[];
  status?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "patient" | "provider";
  recipientId: string;
  recipientName: string;
  timestamp: string;
  content: string;
  read: boolean;
  attachments?: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedToId: string;
  assignedById: string;
  patientId?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  category: string;
}

export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  category: string[];
  contentType: "article" | "video" | "infographic";
  url: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}
