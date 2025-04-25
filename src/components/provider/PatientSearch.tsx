
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { Search, User, FileText, Calendar, AlertCircle, Clock } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PatientData {
  id: string;
  full_name: string;
  date_of_birth: string | null;
  blood_type: string | null;
  medical_conditions: string[] | null;
  recent_visit?: string;
}

export const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'id'>('name');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PatientData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    
    setIsSearching(true);
    setSearchPerformed(true);
    
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'patient');
        
      if (searchBy === 'name') {
        query = query.ilike('full_name', `%${searchTerm}%`);
      } else {
        query = query.eq('id', searchTerm);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setSearchResults(data || []);
      
      if (data && data.length === 0) {
        toast.info('No patients found matching your search criteria');
      }
    } catch (error: any) {
      toast.error('Error searching for patients', {
        description: error.message
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const viewPatientDetails = (patientId: string) => {
    navigate(`/provider/patient/${patientId}`);
  };

  return (
    <Card className="neo-card bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle>Patient Search</CardTitle>
        <CardDescription>Find patients by name or ID</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder={`Search patients by ${searchBy === 'name' ? 'name' : 'ID'}`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={searchBy === 'name' ? "default" : "outline"} 
                onClick={() => setSearchBy('name')}
                className="rounded-none"
                size="sm"
              >
                Name
              </Button>
              <Button 
                variant={searchBy === 'id' ? "default" : "outline"} 
                onClick={() => setSearchBy('id')}
                className="rounded-none"
                size="sm"
              >
                ID
              </Button>
            </div>
            
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          {searchPerformed && (
            <div className="space-y-2 mt-4">
              <div className="text-sm text-muted-foreground">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
              </div>
              
              {searchResults.map((patient) => (
                <div 
                  key={patient.id} 
                  className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 hover:border-trustBlue-600 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-neutral-300" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{patient.full_name}</div>
                        <div className="text-xs text-neutral-400">
                          {patient.date_of_birth ? `DOB: ${new Date(patient.date_of_birth).toLocaleDateString()}` : 'No DOB recorded'}
                          {patient.blood_type ? ` • Blood Type: ${patient.blood_type}` : ''}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => viewPatientDetails(patient.id)}>
                      View Details
                    </Button>
                  </div>
                  
                  {patient.medical_conditions && patient.medical_conditions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-neutral-400 mb-1">Medical Conditions:</div>
                      <div className="flex flex-wrap gap-1">
                        {patient.medical_conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSearch;
