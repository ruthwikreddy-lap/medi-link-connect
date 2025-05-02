
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Pill, AlertCircle, Clock } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface PrescriptionFormProps {
  patientId?: string;
  prescriptionId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Patient {
  id: string;
  full_name: string;
}

// Define a type for the prescription data to ensure type safety
interface Prescription {
  id: string;
  patient_id: string;
  provider_id: string;
  medication: string;
  dosage: string;
  frequency: string;
  instructions: string | null;
  start_date: string;
  end_date: string | null;
  status: string;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  patientId, 
  prescriptionId,
  onSuccess,
  onCancel
}) => {
  const { profile } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>(patientId || '');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [instructions, setInstructions] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!prescriptionId);
  
  // Fetch patients for dropdown
  useEffect(() => {
    if (profile?.user_type !== 'provider') return;
    
    const fetchPatients = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name')
          .eq('user_type', 'patient');
          
        if (error) throw error;
        
        setPatients(data || []);
      } catch (error: any) {
        console.error('Error fetching patients:', error);
        toast.error('Failed to load patients', {
          description: error.message
        });
      }
    };
    
    fetchPatients();
  }, [profile]);
  
  // Load prescription data if editing
  useEffect(() => {
    if (!prescriptionId) return;
    
    const fetchPrescription = async () => {
      try {
        const { data, error } = await supabase
          .from('prescriptions')
          .select('*')
          .eq('id', prescriptionId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setSelectedPatient(data.patient_id);
          setMedication(data.medication);
          setDosage(data.dosage);
          setFrequency(data.frequency);
          setInstructions(data.instructions || '');
          setStartDate(data.start_date ? new Date(data.start_date) : undefined);
          setEndDate(data.end_date ? new Date(data.end_date) : undefined);
        }
      } catch (error: any) {
        console.error('Error fetching prescription:', error);
        toast.error('Failed to load prescription data', {
          description: error.message
        });
      }
    };
    
    fetchPrescription();
  }, [prescriptionId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient || !medication || !dosage || !frequency || !startDate) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    if (!profile) {
      toast.error('Provider information not available');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const prescriptionData = {
        patient_id: selectedPatient,
        provider_id: profile.id,
        medication,
        dosage,
        frequency,
        instructions,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate ? endDate.toISOString().split('T')[0] : null,
        status: 'active'
      };
      
      let result;
      
      if (isEditing) {
        result = await supabase
          .from('prescriptions')
          .update(prescriptionData)
          .eq('id', prescriptionId);
      } else {
        result = await supabase
          .from('prescriptions')
          .insert([prescriptionData]);
      }
      
      if (result.error) throw result.error;
      
      toast.success(isEditing ? 'Prescription updated successfully' : 'Prescription created successfully');
      
      if (onSuccess) onSuccess();
      
      // Reset form if not editing
      if (!isEditing) {
        setMedication('');
        setDosage('');
        setFrequency('');
        setInstructions('');
        setStartDate(new Date());
        setEndDate(undefined);
      }
      
    } catch (error: any) {
      toast.error(isEditing ? 'Failed to update prescription' : 'Failed to create prescription', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="neo-card bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Prescription' : 'Create New Prescription'}</CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Update prescription details for your patient' 
            : 'Prescribe medication for your patient'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="patient">Patient</Label>
              <Select
                disabled={!!patientId || isLoading}
                value={selectedPatient}
                onValueChange={setSelectedPatient}
              >
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="medication">Medication Name</Label>
              <Input
                id="medication"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                placeholder="e.g., Amoxicillin"
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 500mg"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g., Twice daily"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <DatePicker
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <DatePicker
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g., Take with food. Avoid alcohol."
                rows={3}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isLoading} className="bg-trustBlue-600">
                {isLoading ? 'Saving...' : (isEditing ? 'Update Prescription' : 'Create Prescription')}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrescriptionForm;
