
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Calendar, Tag, Check, 
  AlertCircle, ChevronRight, UserCog, Stethoscope, 
  Eye, FileLock, Printer, MousePointerClick 
} from 'lucide-react';

const MedicalRecordsContent = () => {
  // Demo medical records data
  const records = [
    {
      id: 'REC-2023-05-10',
      title: 'Annual Physical Examination',
      date: 'May 10, 2023',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      summary: 'Complete physical assessment with blood work and vital signs. All results within normal range.',
      status: 'complete',
      tags: ['physical', 'routine'],
      hasAttachments: true
    },
    {
      id: 'REC-2023-08-23',
      title: 'Cardiology Consultation',
      date: 'August 23, 2023',
      doctor: 'Dr. Michael Carrera',
      department: 'Cardiology',
      summary: 'ECG, stress test, and blood pressure monitoring. Mild hypertension detected, follow-up recommended.',
      status: 'follow-up',
      tags: ['cardiology', 'specialist'],
      hasAttachments: true
    },
    {
      id: 'REC-2023-10-15',
      title: 'Blood Test Results',
      date: 'October 15, 2023',
      doctor: 'Dr. Emily Wong',
      department: 'Laboratory',
      summary: 'Comprehensive metabolic panel, complete blood count, and lipid profile. Cholesterol slightly elevated.',
      status: 'action-needed',
      tags: ['laboratory', 'blood-work'],
      hasAttachments: true
    },
    {
      id: 'REC-2024-01-05',
      title: 'Prescription Renewal',
      date: 'January 5, 2024',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Medicine',
      summary: 'Renewal of lisinopril and atorvastatin prescriptions for hypertension and cholesterol management.',
      status: 'complete',
      tags: ['prescription', 'medication'],
      hasAttachments: false
    },
    {
      id: 'REC-2024-02-18',
      title: 'Ophthalmology Check-up',
      date: 'February 18, 2024',
      doctor: 'Dr. James Patel',
      department: 'Ophthalmology',
      summary: 'Vision test, eye pressure check, and retinal examination. No significant changes observed.',
      status: 'complete',
      tags: ['ophthalmology', 'specialist'],
      hasAttachments: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge variant="outline" className="text-green-500 border-green-500/30"><Check className="mr-1 h-3 w-3" />Complete</Badge>;
      case 'follow-up':
        return <Badge variant="outline" className="text-amber-500 border-amber-500/30"><Calendar className="mr-1 h-3 w-3" />Follow-up</Badge>;
      case 'action-needed':
        return <Badge variant="outline" className="text-red-500 border-red-500/30"><AlertCircle className="mr-1 h-3 w-3" />Action Needed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Medical Records</h2>
          <p className="text-sm text-neutral-400">Access your complete health history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-700">
            <FileLock className="mr-1.5 h-4 w-4" />
            Privacy Settings
          </Button>
          <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-700">
            <Download className="mr-1.5 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      <Card className="neo-card bg-neutral-900 border-neutral-800">
        <CardHeader className="pb-2 px-4 pt-4 border-b border-neutral-800">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base text-white">Recent Records</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                Request Records
              </Button>
            </div>
          </div>
          <CardDescription className="text-xs">Medical documentation from your healthcare providers</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-800">
            {records.map((record) => (
              <div key={record.id} className="p-4 hover:bg-neutral-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-trustBlue-900/50 flex items-center justify-center mt-1">
                      <FileText className="h-5 w-5 text-trustBlue-400" />
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white">{record.title}</h3>
                        {getStatusBadge(record.status)}
                      </div>
                      
                      <p className="text-xs text-neutral-400 mb-2">{record.summary}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {record.date}
                        </div>
                        <div className="flex items-center">
                          <UserCog className="mr-1 h-3 w-3" />
                          {record.doctor}
                        </div>
                        <div className="flex items-center">
                          <Stethoscope className="mr-1 h-3 w-3" />
                          {record.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {record.tags.map((tag, i) => (
                            <span key={i} className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {record.hasAttachments && (
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="neo-card bg-neutral-900 border-neutral-800">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base text-white">Health Summary</CardTitle>
            <CardDescription className="text-xs">Key health metrics and trends</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-3 text-neutral-600" />
              <p className="text-sm text-neutral-400 mb-3">Health summary visualization coming soon</p>
              <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-700">
                <MousePointerClick className="mr-1.5 h-3.5 w-3.5" />
                View Summary
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="neo-card bg-neutral-900 border-neutral-800">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base text-white">Record Categories</CardTitle>
            <CardDescription className="text-xs">Browse by record type</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start h-auto py-2 px-3 border-neutral-700 hover:bg-neutral-700">
                <FileText className="mr-2 h-4 w-4 text-trustBlue-400" />
                <div className="text-left">
                  <div className="font-medium text-sm">Visit Notes</div>
                  <div className="text-xs text-neutral-400">12 records</div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-2 px-3 border-neutral-700 hover:bg-neutral-700">
                <FileText className="mr-2 h-4 w-4 text-amber-400" />
                <div className="text-left">
                  <div className="font-medium text-sm">Lab Results</div>
                  <div className="text-xs text-neutral-400">8 records</div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-2 px-3 border-neutral-700 hover:bg-neutral-700">
                <FileText className="mr-2 h-4 w-4 text-red-400" />
                <div className="text-left">
                  <div className="font-medium text-sm">Imaging</div>
                  <div className="text-xs text-neutral-400">3 records</div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-2 px-3 border-neutral-700 hover:bg-neutral-700">
                <FileText className="mr-2 h-4 w-4 text-green-400" />
                <div className="text-left">
                  <div className="font-medium text-sm">Vaccinations</div>
                  <div className="text-xs text-neutral-400">5 records</div>
                </div>
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-7 mt-3">
              <span>View all categories</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalRecordsContent;
