
import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrustIndicator } from "@/components/TrustIndicator";
import EmergencyCard from "@/components/EmergencyCard";
import { useAuth } from '@/contexts/AuthContext';
import MedicalRecordsContent from "@/components/patient/MedicalRecordsContent";
import PrescriptionsContent from "@/components/patient/PrescriptionsContent";
import AppointmentsContent from "@/components/patient/AppointmentsContent";
import ResourcesContent from "@/components/patient/ResourcesContent";
import { 
  User, Bell, CalendarClock, Calendar as CalendarIcon, 
  FileText, ClipboardList, Search, Pill, Clock, 
  FileMinus, Phone, MapPin, QrCode, Info, Book, 
  Heart, Bookmark, Share, CheckCircle2, AlertCircle, 
  Settings, LayoutGrid, Eye, MousePointerClick, RefreshCcw,
  ChevronRight, Plus, MoreHorizontal, BarChart3
} from 'lucide-react';

const PatientDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <NavBar />
      <main className="flex-grow pt-20 pb-12 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="glass-card p-4 rounded-xl shadow-glass border border-trustBlue-800/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-trustBlue-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">Welcome, {profile?.full_name || 'Patient'}</h1>
                      <p className="text-sm text-neutral-400">Last login: Today at 9:45 AM</p>
                    </div>
                    <TrustIndicator type="secure" className="ml-2" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="trust" size="sm" className="flex items-center gap-1.5 h-8">
                    <Bell className="h-3.5 w-3.5" />
                    <span className="text-xs">2 Updates</span>
                  </Button>
                  <Button variant="trust" size="sm" className="flex items-center gap-1.5 h-8">
                    <CalendarClock className="h-3.5 w-3.5" />
                    <span className="text-xs">Next: Today, 2:00 PM</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-8">
                    <Settings className="h-3.5 w-3.5" />
                    <span className="text-xs">Preferences</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="bg-neutral-900 border border-neutral-800 rounded-lg p-1 mb-4 w-full max-w-full overflow-x-auto flex-nowrap">
              <TabsTrigger value="overview" className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400 text-xs py-1.5">
                Overview
              </TabsTrigger>
              <TabsTrigger value="records" className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400 text-xs py-1.5">
                Medical Records
              </TabsTrigger>
              <TabsTrigger value="prescriptions" className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400 text-xs py-1.5">
                Prescriptions
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400 text-xs py-1.5">
                Appointments
              </TabsTrigger>
              <TabsTrigger value="emergency" className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400 text-xs py-1.5">
                Emergency Card
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400 text-xs py-1.5">
                Resources
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Medical Summary Widget */}
                <Card className="neo-card bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white">Medical Summary</CardTitle>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">Recent health updates</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="space-y-2">
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-trustBlue-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-white">Blood Test Results</div>
                            <div className="text-xs text-neutral-400">Cholesterol: Normal range</div>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs h-5">
                                <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                                All normal
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-warmAccent-500 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-white">Blood Pressure Check</div>
                            <div className="text-xs text-neutral-400">Slightly elevated: 135/85</div>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs text-warmAccent-500 border-warmAccent-700 h-5">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                Follow-up needed
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-7"
                      onClick={() => setActiveTab("records")}
                    >
                      <span>View all records</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Upcoming Appointments Widget */}
                <Card className="neo-card bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white">Upcoming Appointments</CardTitle>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">Schedule & reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="space-y-2">
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-white">Dr. Sarah Johnson</div>
                          <Badge variant="trust" className="text-xs h-5">Today</Badge>
                        </div>
                        <div className="text-xs text-neutral-400">Cardiology Consultation</div>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-1 text-xs text-neutral-300">
                            <Clock className="h-3 w-3" />
                            <span>2:00 PM - 3:00 PM</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MapPin className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-white">Dr. Michael Lee</div>
                          <Badge variant="outline" className="text-xs h-5">Aug 20</Badge>
                        </div>
                        <div className="text-xs text-neutral-400">General Check-up</div>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-1 text-xs text-neutral-300">
                            <Clock className="h-3 w-3" />
                            <span>10:30 AM - 11:30 AM</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <RefreshCcw className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-7"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <span>Manage appointments</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Calendar Widget */}
                <Card className="neo-card bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white">Calendar</CardTitle>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">Health events & appointments</CardDescription>
                  </CardHeader>
                  <CardContent className="px-3 py-2">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="bg-neutral-900 rounded-md p-0 scale-90 origin-top"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-7"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <span>View full calendar</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Second row widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prescription Tracker */}
                <Card className="neo-card bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white">Medication Tracker</CardTitle>
                      <TrustIndicator type="secure" size="sm" />
                    </div>
                    <CardDescription className="text-xs">Today's medications</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="space-y-2">
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                              <Pill className="h-3.5 w-3.5 text-trustBlue-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">Lisinopril 10mg</div>
                              <div className="text-xs text-neutral-400">1 tablet, once daily</div>
                            </div>
                          </div>
                          <Button variant="trust" size="sm" className="h-7 text-xs">Take Now</Button>
                        </div>
                        <div className="flex items-center justify-between mt-1.5 text-xs">
                          <div className="flex items-center gap-1 text-neutral-300">
                            <Clock className="h-3 w-3" />
                            <span>Morning with food</span>
                          </div>
                          <Badge variant="outline" className="text-xs h-5">
                            <FileMinus className="mr-1 h-3 w-3" />
                            Refill: 15 days left
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                              <Pill className="h-3.5 w-3.5 text-trustBlue-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">Atorvastatin 20mg</div>
                              <div className="text-xs text-neutral-400">1 tablet, once daily</div>
                            </div>
                          </div>
                          <div className="flex items-center text-green-500 text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Taken
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1.5 text-xs">
                          <div className="flex items-center gap-1 text-neutral-300">
                            <Clock className="h-3 w-3" />
                            <span>Evening</span>
                          </div>
                          <Badge variant="outline" className="text-xs h-5">
                            <FileMinus className="mr-1 h-3 w-3" />
                            Refill: 5 days left
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-7"
                      onClick={() => setActiveTab("prescriptions")}
                    >
                      <span>Manage medications</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Replace Emergency Card with a preview version linking to full tab */}
                <Card className="neo-card bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white">Emergency Information</CardTitle>
                      <TrustIndicator type="secure" size="sm" />
                    </div>
                    <CardDescription className="text-xs">Quick access for healthcare providers</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="text-sm font-medium text-white mb-1">Digital Health Card</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-neutral-400">
                            <div className="mb-0.5">{profile?.full_name || 'Patient'}</div>
                            <div className="mb-0.5">ID: #MED-8734-1129</div>
                            <Badge variant="secure" className="mt-1 text-xs h-5">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Valid
                            </Badge>
                          </div>
                          <div className="h-16 w-16 bg-white rounded-md flex items-center justify-center">
                            <QrCode className="h-12 w-12 text-neutral-900" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                        <div className="text-sm font-medium text-white mb-1">Critical Information</div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-start gap-1.5">
                            <Info className="h-3 w-3 text-warmAccent-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-neutral-300">Blood Type:</span> 
                              <span className="text-white ml-1">O+</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Info className="h-3 w-3 text-warmAccent-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-neutral-300">Allergies:</span> 
                              <span className="text-white ml-1">None</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Info className="h-3 w-3 text-warmAccent-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-neutral-300">Emergency Contact:</span> 
                              <span className="text-white ml-1">+1 (555) 123-4567</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-7"
                      onClick={() => setActiveTab("emergency")}
                    >
                      <span>View full emergency card</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Health Resources */}
              <div>
                <Card className="neo-card bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2 px-4 pt-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-white">Health Resources</CardTitle>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Book className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">Personalized for your health needs</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700 hover:border-trustBlue-600 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                            <Heart className="h-3.5 w-3.5 text-trustBlue-400" />
                          </div>
                          <div className="text-sm font-medium text-white">Heart Health Basics</div>
                        </div>
                        <p className="text-xs text-neutral-400 mb-2 line-clamp-2">Essential tips for maintaining cardiovascular health and reducing risks.</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs h-5">Recommended</Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Bookmark className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700 hover:border-trustBlue-600 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                            <BarChart3 className="h-3.5 w-3.5 text-trustBlue-400" />
                          </div>
                          <div className="text-sm font-medium text-white">Blood Pressure Guide</div>
                        </div>
                        <p className="text-xs text-neutral-400 mb-2 line-clamp-2">Understanding your blood pressure readings and management strategies.</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="warm" className="text-xs h-5">New</Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Bookmark className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700 hover:border-trustBlue-600 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-7 w-7 rounded-full bg-trustBlue-900/50 flex items-center justify-center">
                            <Pill className="h-3.5 w-3.5 text-trustBlue-400" />
                          </div>
                          <div className="text-sm font-medium text-white">Medication Facts</div>
                        </div>
                        <p className="text-xs text-neutral-400 mb-2 line-clamp-2">Important information about your current medications and possible interactions.</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs h-5">Related</Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Bookmark className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs h-7"
                      onClick={() => setActiveTab("resources")}
                    >
                      <span>Explore all resources</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Medical Records Tab Content */}
            <TabsContent value="records" className="mt-0">
              <MedicalRecordsContent />
            </TabsContent>
            
            {/* Prescriptions Tab Content */}
            <TabsContent value="prescriptions" className="mt-0">
              <PrescriptionsContent />
            </TabsContent>
            
            {/* Appointments Tab Content */}
            <TabsContent value="appointments" className="mt-0">
              <AppointmentsContent />
            </TabsContent>
            
            {/* Emergency Card Tab Content */}
            <TabsContent value="emergency" className="mt-0">
              <EmergencyCard />
            </TabsContent>
            
            {/* Resources Tab Content */}
            <TabsContent value="resources" className="mt-0">
              <ResourcesContent />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
