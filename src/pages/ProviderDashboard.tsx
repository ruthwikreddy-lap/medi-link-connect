import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrustIndicator, PatientPriorityIndicator } from "@/components/TrustIndicator";
import { Badge } from "@/components/ui/badge";
import PatientDetailsModal from "@/components/provider/PatientDetailsModal";
import BedManagement from "@/components/provider/BedManagement";
import { 
  UserRound, Search, BellRing, Layout, Users, FolderOpen, 
  HeartPulse, Calendar, ClipboardList, MessageSquare, Bell, 
  Settings, LogOut, Bed, AlertCircle, PlusCircle, ChevronRight,
  ArrowUpRight, Clock, FileText, Activity, Pill, Clipboard,
  PlayCircle, ChevronDown, Filter, MoreHorizontal, RefreshCw
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const recentPatients = [
  { id: 'P-7821', name: 'Elizabeth Chen', status: 'active', priority: 'medium', age: 42, room: '302-A', lastUpdated: '10 min ago', diagnosis: 'Hypertension, Type 2 Diabetes' },
  { id: 'P-5432', name: 'James Wilson', status: 'active', priority: 'critical', age: 68, room: 'ICU-5', lastUpdated: '5 min ago', diagnosis: 'Myocardial Infarction' },
  { id: 'P-6789', name: 'Maria Garcia', status: 'active', priority: 'high', age: 35, room: '205-B', lastUpdated: '22 min ago', diagnosis: 'Pneumonia' },
  { id: 'P-4532', name: 'Robert Johnson', status: 'active', priority: 'low', age: 29, room: '118-C', lastUpdated: '1 hour ago', diagnosis: 'Fractured Tibia' },
  { id: 'P-9087', name: 'Sarah Thompson', status: 'pending', priority: 'medium', age: 51, room: 'Waiting', lastUpdated: '34 min ago', diagnosis: 'Chest Pain - Evaluation' },
];

const pendingTasks = [
  { id: 'T-1234', patient: 'James Wilson', task: 'Review ECG results', priority: 'high', due: '30 min' },
  { id: 'T-2345', patient: 'Maria Garcia', task: 'Sign discharge papers', priority: 'medium', due: '2 hours' },
  { id: 'T-3456', patient: 'Elizabeth Chen', task: 'Medication reconciliation', priority: 'medium', due: '1 hour' },
  { id: 'T-4567', patient: 'Sarah Thompson', task: 'Initial assessment', priority: 'high', due: '15 min' },
];

const upcomingAppointments = [
  { time: '10:30 AM', patient: 'Robert Johnson', type: 'Follow-up', duration: '15 min' },
  { time: '11:00 AM', patient: 'New Patient', type: 'Initial Consult', duration: '30 min' },
  { time: '1:15 PM', patient: 'Sarah Thompson', type: 'Test Results', duration: '15 min' },
  { time: '2:30 PM', patient: 'Department Meeting', type: 'Staff Only', duration: '45 min' },
];

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast("Search Initiated", {
        description: `Searching for "${searchQuery}"`,
      });
    }
  };

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handleClosePatientDetails = () => {
    setSelectedPatient(null);
  };

  const handleCompleteTask = (taskId: string) => {
    toast.success("Task completed", {
      description: `Task ${taskId} has been marked as complete.`,
    });
  };

  const handleStartAppointment = (appointmentInfo: any) => {
    toast.success("Appointment started", {
      description: `Starting appointment with ${appointmentInfo.patient}.`,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950">
      <div className="hidden md:flex w-64 flex-col bg-neutral-900 border-r border-neutral-800">
        <div className="flex h-16 items-center border-b border-neutral-800 px-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-trustBlue-400" />
            <h1 className="text-lg font-semibold text-white">MediLink Pro</h1>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-trustBlue-800 flex items-center justify-center">
                <UserRound className="h-5 w-5 text-trustBlue-300" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-neutral-900"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dr. Sarah Miller</p>
              <p className="text-xs text-neutral-400">Cardiology</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "overview" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("overview")}
            >
              <Layout className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "patients" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("patients")}
            >
              <Users className="mr-2 h-4 w-4" />
              Patients
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "records" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("records")}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Records
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "schedule" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("schedule")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "tasks" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("tasks")}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Tasks
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "messages" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start mb-1 ${activeTab === "beds" ? 'bg-trustBlue-900/30' : ''}`}
              onClick={() => setActiveTab("beds")}
            >
              <Bed className="mr-2 h-4 w-4" />
              Bed Management
            </Button>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <Button variant="ghost" className="w-full justify-start mb-1">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-neutral-400 hover:text-white" onClick={() => navigate("/")}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-4 backdrop-blur-sm">
          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon">
              <HeartPulse className="h-5 w-5 text-trustBlue-400" />
            </Button>
          </div>
          
          <div className="flex flex-1 items-center space-x-4 md:ml-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-[500px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                type="search"
                placeholder="Search patients, records, or orders..."
                className="w-full bg-neutral-800 border-neutral-700 pl-9 pr-4 focus:border-trustBlue-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <BellRing className="h-5 w-5 text-neutral-300" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </Button>
            <div className="hidden md:flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-trustBlue-800 flex items-center justify-center">
                <UserRound className="h-4 w-4 text-trustBlue-300" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto bg-neutral-900 p-4 md:p-6">
          {activeTab !== "records" && activeTab !== "schedule" && activeTab !== "messages" && activeTab !== "beds" && (
            <div className="mb-6">
              <div className="flex items-baseline justify-between">
                <h1 className="text-2xl font-semibold text-white">Welcome back, Dr. Miller</h1>
                <p className="text-sm text-neutral-400">Wednesday, June 10, 2023</p>
              </div>
              
              <div className="mt-1 flex items-center text-sm text-neutral-400">
                <p>Hospital General | Department of Cardiology</p>
                <TrustIndicator type="verified" size="sm" className="ml-3" />
              </div>
            </div>
          )}
          
          {(activeTab === "overview") && (
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-trustBlue-200">Patient Census</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-700/50 p-3 rounded-lg">
                      <p className="text-2xl font-semibold text-white">24</p>
                      <p className="text-xs text-neutral-400">Active patients</p>
                    </div>
                    <div className="bg-neutral-700/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-semibold text-white">3</p>
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      </div>
                      <p className="text-xs text-neutral-400">Critical cases</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-trustBlue-400 p-0 h-auto" onClick={() => setActiveTab("patients")}>
                    View all patients
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-trustBlue-200">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-trustBlue-400" />
                    <p className="text-sm text-white">Next: <span className="font-medium">10:30 AM</span></p>
                    <span className="ml-auto text-xs bg-neutral-700 px-2 py-0.5 rounded">15 min</span>
                  </div>
                  <p className="text-sm font-medium text-white">Robert Johnson - Follow-up</p>
                  <div className="mt-2 flex items-center">
                    <Badge variant="outline" className="text-xs border-neutral-700">
                      7 appointments today
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-trustBlue-400 p-0 h-auto" onClick={() => setActiveTab("schedule")}>
                    View full schedule
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-trustBlue-200">Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">Review ECG results</p>
                      <Badge className="bg-red-600 text-white text-xs ml-auto">Urgent</Badge>
                    </div>
                    <p className="text-xs text-neutral-400">James Wilson - Due in 30 min</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-semibold text-white">12</p>
                      <p className="text-xs text-neutral-400">Tasks<br/>pending</p>
                      <p className="text-2xl font-semibold text-white ml-6">5</p>
                      <p className="text-xs text-neutral-400">High<br/>priority</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-xs text-trustBlue-400 p-0 h-auto" onClick={() => setActiveTab("tasks")}>
                    Manage tasks
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <TabsList className="bg-neutral-800 border border-neutral-700">
                <TabsTrigger value="overview" className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="patients" className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white">
                  Patients
                </TabsTrigger>
                <TabsTrigger value="tasks" className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="appointments" className="data-[state=active]:bg-trustBlue-900 data-[state=active]:text-white">
                  Appointments
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1 text-sm border-neutral-700 bg-neutral-800 hover:bg-neutral-700">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-sm border-neutral-700 bg-neutral-800 hover:bg-neutral-700">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </Button>
              </div>
            </div>
            
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-12">
                <Card className="md:col-span-8 bg-neutral-800 border-neutral-700">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">Recent Patients</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 gap-1 text-sm border-neutral-700 hover:bg-neutral-700"
                        onClick={() => {
                          toast.success("Add Patient", {
                            description: "Patient registration form would open here."
                          });
                        }}
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        New Patient
                      </Button>
                    </div>
                    <CardDescription>Your recently accessed patients</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="overflow-auto">
                      <Table>
                        <TableHeader className="bg-neutral-900/30">
                          <TableRow className="border-neutral-700 hover:bg-transparent">
                            <TableHead className="text-neutral-400 font-medium">Patient</TableHead>
                            <TableHead className="text-neutral-400 font-medium">Status</TableHead>
                            <TableHead className="text-neutral-400 font-medium">Room</TableHead>
                            <TableHead className="text-neutral-400 font-medium">Diagnosis</TableHead>
                            <TableHead className="text-neutral-400 font-medium">Last Updated</TableHead>
                            <TableHead className="text-right text-neutral-400 font-medium"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentPatients.map((patient) => (
                            <TableRow key={patient.id} className="border-neutral-700 hover:bg-neutral-700/30 cursor-pointer" onClick={() => handlePatientClick(patient)}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-white">{patient.name}</div>
                                  <div className="text-xs text-neutral-400">{patient.id} • {patient.age}y</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <PatientPriorityIndicator level={patient.priority as any} />
                              </TableCell>
                              <TableCell>
                                <div className="font-medium text-neutral-300">{patient.room}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm text-neutral-300 max-w-[200px] truncate" title={patient.diagnosis}>
                                  {patient.diagnosis}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm text-neutral-400">{patient.lastUpdated}</div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    uiToast({
                                      title: "Patient Options",
                                      description: `Options for ${patient.name}`,
                                    });
                                  }}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-neutral-700 px-6 py-3 flex justify-between">
                    <p className="text-sm text-neutral-400">Showing 5 of 24 patients</p>
                    <Button variant="ghost" size="sm" className="text-sm text-trustBlue-400" onClick={() => setActiveTab("patients")}>
                      View all patients
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="md:col-span-4 space-y-6">
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3 text-sm">
                      <Button 
                        variant="outline" 
                        className="border-neutral-700 hover:bg-neutral-700 justify-start"
                        onClick={() => {
                          toast.success("New Note", {
                            description: "Clinical note editor would open here."
                          });
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4 text-trustBlue-400" />
                        New Note
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-neutral-700 hover:bg-neutral-700 justify-start"
                        onClick={() => {
                          toast.success("Order Test", {
                            description: "Test ordering form would open here."
                          });
                        }}
                      >
                        <Activity className="mr-2 h-4 w-4 text-trustBlue-400" />
                        Order Test
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-neutral-700 hover:bg-neutral-700 justify-start"
                        onClick={() => {
                          toast.success("Prescribe", {
                            description: "Prescription form would open here."
                          });
                        }}
                      >
                        <Pill className="mr-2 h-4 w-4 text-trustBlue-400" />
                        Prescribe
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-neutral-700 hover:bg-neutral-700 justify-start"
                        onClick={() => {
                          toast.success("Rounds", {
                            description: "Rounds checklist would open here."
                          });
                        }}
                      >
                        <Clipboard className="mr-2 h-4 w-4 text-trustBlue-400" />
                        Rounds
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Recent Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Alert 
                        variant="warning" 
                        className="bg-red-900/30 border-red-800/40 text-white cursor-pointer"
                        onClick={() => {
                          toast.error("Critical Alert", {
                            description: "Viewing critical lab result for James Wilson."
                          });
                        }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="text-sm">Critical Lab Result</AlertTitle>
                        <AlertDescription className="text-xs">
                          James Wilson - Troponin level critical
                        </AlertDescription>
                      </Alert>
                      
                      <Alert 
                        variant="trust" 
                        className="bg-amber-900/20 border-amber-700/30 cursor-pointer"
                        onClick={() => {
                          toast.warning("Medication Interaction", {
                            description: "Viewing medication interaction details for Maria Garcia."
                          });
                        }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="text-sm">Medication Interaction</AlertTitle>
                        <AlertDescription className="text-xs">
                          Potential interaction detected for Maria Garcia
                        </AlertDescription>
                      </Alert>
                      
                      <Alert 
                        variant="trust"
                        className="cursor-pointer"
                        onClick={() => {
                          toast.info("New Message", {
                            description: "Opening message from Dr. Thompson."
                          });
                        }}
                      >
                        <Bell className="h-4 w-4" />
                        <AlertTitle className="text-sm">New Message</AlertTitle>
                        <AlertDescription className="text-xs">
                          Dr. Thompson regarding patient consultation
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Learning Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="font-medium text-white">Hypertension Protocol Update</div>
                          <div className="text-xs text-neutral-400">Updated guidelines</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => {
                            toast.success("Learning Resource", {
                              description: "Opening Hypertension Protocol Update video."
                            });
                          }}
                        >
                          <PlayCircle className="h-4 w-4 text-trustBlue-400" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="font-medium text-white">Cardiology Grand Rounds</div>
                          <div className="text-xs text-neutral-400">This Friday, 8:00 AM</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => {
                            toast.success("Calendar Event", {
                              description: "Adding Cardiology Grand Rounds to your calendar."
                            });
                          }}
                        >
                          <Calendar className="h-4 w-4 text-trustBlue-400" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="patients">
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-white">All Patients</CardTitle>
                      <CardDescription>Manage your patient roster</CardDescription>
                    </div>
                    <Button variant="trust" size="sm">
                      <PlusCircle className="mr-1.5 h-4 w-4" />
                      Add Patient
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader className="bg-neutral-900/30">
                        <TableRow className="border-neutral-700 hover:bg-transparent">
                          <TableHead className="text-neutral-400 font-medium">Patient</TableHead>
                          <TableHead className="text-neutral-400 font-medium">Status</TableHead>
                          <TableHead className="text-neutral-400 font-medium">Room</TableHead>
                          <TableHead className="text-neutral-400 font-medium">Diagnosis</TableHead>
                          <TableHead className="text-neutral-400 font-medium">Last Updated</TableHead>
                          <TableHead className="text-right text-neutral-400 font-medium"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentPatients.map((patient) => (
                          <TableRow key={patient.id} className="border-neutral-700 hover:bg-neutral-700/30 cursor-pointer" onClick={() => handlePatientClick(patient)}>
                            <TableCell>
                              <div>
                                <div className="font-medium text-white">{patient.name}</div>
                                <div className="text-xs text-neutral-400">{patient.id} • {patient.age}y</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <PatientPriorityIndicator level={patient.priority as any} />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-neutral-300">{patient.room}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-neutral-300 max-w-[200px] truncate" title={patient.diagnosis}>
                                {patient.diagnosis}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-neutral-400">{patient.lastUpdated}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  uiToast({
                                    title: "Patient Options",
                                    description: `Options for ${patient.name}`,
                                  });
                                }}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-white">Your Tasks</CardTitle>
                      <CardDescription>Manage clinical and administrative tasks</CardDescription>
                    </div>
                    <Button 
                      variant="trust" 
                      size="sm"
                      onClick={() => {
                        toast.success("Add Task", {
                          description: "New task creation form would open here."
                        });
                      }}
                    >
                      <PlusCircle className="mr-1.5 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border border-neutral-700 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{task.task}</p>
                          <p className="text-sm text-neutral-400">Patient: {task.patient}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge className={`
                              ${task.priority === 'high' ? 'bg-red-600' : 'bg-amber-600'} 
                              text-white
                            `}>
                              {task.priority === 'high' ? 'Urgent' : 'Standard'}
                            </Badge>
                            <p className="text-xs text-neutral-400 mt-1">Due in {task.due}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-neutral-700 hover:bg-neutral-700"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            Complete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments">
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-white">Today's Schedule</CardTitle>
                      <CardDescription>Your appointments and meetings for today</CardDescription>
                    </div>
                    <Button 
                      variant="trust" 
                      size="sm"
                      onClick={() => {
                        toast.success("New Appointment", {
                          description: "Appointment scheduling form would open here."
                        });
                      }}
                    >
                      <PlusCircle className="mr-1.5 h-4 w-4" />
                      New Appointment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-neutral-700 rounded-lg">
                        <div className="flex gap-4 items-center">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-white">{apt.time}</span>
                            <span className="text-xs text-neutral-400">{apt.duration}</span>
                          </div>
                          <div className="h-full w-px bg-neutral-700"></div>
                          <div>
                            <p className="font-medium text-white">{apt.patient}</p>
                            <p className="text-sm text-neutral-400">{apt.type}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-neutral-700 hover:bg-neutral-700"
                            onClick={() => {
                              toast.info("Reschedule", {
                                description: `Rescheduling appointment with ${apt.patient}.`
                              });
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="clinical" 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleStartAppointment(apt)}
                          >
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {activeTab === "records" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Medical Records</h2>
                  <p className="text-sm text-neutral-400">Access and manage patient medical data</p>
                </div>
                <Button variant="trust" size="sm">
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  New Record
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-neutral-800 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      <FileText className="inline-block mr-2 h-5 w-5 text-trustBlue-400" />
                      Patient Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentPatients.slice(0, 3).map(patient => (
                      <div key={patient.id} className="flex items-center p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                        <div className="flex-1">
                          <p className="font-medium text-white">{patient.name}</p>
                          <p className="text-xs text-neutral-400">{patient.id} • Last updated {patient.lastUpdated}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-neutral-700">View All Records</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      <Activity className="inline-block mr-2 h-5 w-5 text-trustBlue-400" />
                      Recent Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                      <Badge className="bg-amber-600 mb-1">New</Badge>
                      <p className="font-medium text-white">Blood Work Results</p>
                      <p className="text-xs text-neutral-400">James Wilson • 2 hours ago</p>
                    </div>
                    <div className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                      <p className="font-medium text-white">ECG Report</p>
                      <p className="text-xs text-neutral-400">Maria Garcia • 1 day ago</p>
                    </div>
                    <div className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                      <p className="font-medium text-white">CT Scan Results</p>
                      <p className="text-xs text-neutral-400">Robert Johnson • 2 days ago</p>
                    </div>
                    <Button variant="outline" className="w-full border-neutral-700">View All Test Results</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      <Pill className="inline-block mr-2 h-5 w-5 text-trustBlue-400" />
                      Medication Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                      <p className="font-medium text-white">Atorvastatin 20mg</p>
                      <p className="text-xs text-neutral-400">Elizabeth Chen • Prescribed 5 days ago</p>
                    </div>
                    <div className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                      <Badge className="bg-red-600 mb-1">Allergy</Badge>
                      <p className="font-medium text-white">Penicillin</p>
                      <p className="text-xs text-neutral-400">James Wilson • Updated 1 week ago</p>
                    </div>
                    <div className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-700/30 cursor-pointer">
                      <p className="font-medium text-white">Hydrochlorothiazide 25mg</p>
                      <p className="text-xs text-neutral-400">Sarah Thompson • Prescribed 3 days ago</p>
                    </div>
                    <Button variant="outline" className="w-full border-neutral-700">View All Medications</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Schedule</h2>
                  <p className="text-sm text-neutral-400">Manage appointments and clinical sessions</p>
                </div>
                <Button variant="trust" size="sm">
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  New Appointment
                </Button>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="md:col-span-3 bg-neutral-800 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((apt, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-neutral-700 rounded-lg hover:bg-neutral-700/30">
                        <div className="flex gap-4 items-center">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-white">{apt.time}</span>
                            <span className="text-xs text-neutral-400">{apt.duration}</span>
                          </div>
                          <div className="h-full w-px bg-neutral-700"></div>
                          <div>
                            <p className="font-medium text-white">{apt.patient}</p>
                            <p className="text-sm text-neutral-400">{apt.type}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-neutral-700 hover:bg-neutral-700"
                            onClick={() => {
                              toast.info("Reschedule", {
                                description: `Rescheduling appointment with ${apt.patient}.`
                              });
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="clinical" 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleStartAppointment(apt)}
                          >
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-xs text-neutral-400 font-medium py-1">{day}</div>
                      ))}
                      {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 2;
                        const isToday = day === 10;
                        const hasAppointment = [4, 10, 15, 22, 28].includes(day);
                        return (
                          <div 
                            key={i}
                            className={`
                              text-xs rounded-full w-6 h-6 mx-auto flex items-center justify-center
                              ${day < 1 || day > 30 ? 'text-neutral-600' : 'text-white hover:bg-neutral-700 cursor-pointer'}
                              ${isToday ? 'bg-trustBlue-600 hover:bg-trustBlue-700' : ''}
                              ${hasAppointment && !isToday ? 'border border-trustBlue-600' : ''}
                            `}
                          >
                            {day > 0 && day <= 30 ? day : ''}
                          </div>
                        );
                      })}
                    </div>
                    <Button variant="outline" className="w-full border-neutral-700 mt-2">Full Calendar</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Messages</h2>
                  <p className="text-sm text-neutral-400">Secure clinical communications</p>
                </div>
                <Button variant="trust" size="sm">
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  New Message
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-neutral-800 border-neutral-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Inbox</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-white">Dr. Thompson</p>
                        <Badge variant="outline" className="border-trustBlue-600 text-trustBlue-400">New</Badge>
                      </div>
                      <p className="text-sm text-neutral-300 line-clamp-1">Regarding the patient consultation we discussed yesterday...</p>
                      <p className="text-xs text-neutral-400 mt-1">30 minutes ago</p>
                    </div>
                    
                    <div className="p-3 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-white">Nurse Martinez</p>
                      </div>
                      <p className="text-sm text-neutral-300 line-clamp-1">Patient in room 302 is requesting additional pain medication.</p>
                      <p className="text-xs text-neutral-400 mt-1">2 hours ago</p>
                    </div>
                    
                    <div className="p-3 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-white">Lab Results</p>
                      </div>
                      <p className="text-sm text-neutral-300 line-clamp-1">Results for patient James Wilson are ready for review.</p>
                      <p className="text-xs text-neutral-400 mt-1">Yesterday</p>
                    </div>
                    
                    <Button variant="outline" className="w-full border-neutral-700">View All Messages</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700 md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-trustBlue-800 flex items-center justify-center">
                        <UserRound className="h-5 w-5 text-trustBlue-300" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">Dr. Thompson</CardTitle>
                        <CardDescription>Neurology • Online 2h ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="max-h-[300px] overflow-y-auto space-y-4 p-2">
                      <div className="flex items-end gap-2">
                        <div className="w-8 h-8 rounded-full bg-trustBlue-800 flex items-center justify-center">
                          <UserRound className="h-4 w-4 text-trustBlue-300" />
                        </div>
                        <div className="bg-neutral-700 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                          <p className="text-sm text-white">Hello Dr. Miller, I wanted to follow up about the patient consultation we discussed yesterday. Have you had a chance to review the scans?</p>
                          <p className="text-xs text-neutral-400 mt-1">10:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-end gap-2">
                        <div className="bg-trustBlue-900 p-3 rounded-lg rounded-br-none max-w-[80%]">
                          <p className="text-sm text-white">Hi Dr. Thompson, yes I reviewed them this morning. I think we should discuss treatment options. Are you available this afternoon?</p>
                          <p className="text-xs text-trustBlue-300 mt-1">10:45 AM</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-trustBlue-700 flex items-center justify-center">
                          <UserRound className="h-4 w-4 text-trustBlue-200" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="text-xs text-neutral-500 bg-neutral-800/50 px-3 py-1 rounded-full">Today</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Input placeholder="Type your message..." className="bg-neutral-700 border-neutral-600" />
                      <Button variant="trust">Send</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "beds" && <BedManagement />}
        </div>
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          open={true}
          onClose={handleClosePatientDetails}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;
