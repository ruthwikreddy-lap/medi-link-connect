
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, Heart, FileText, VideoIcon, Search, Bookmark, 
  Share, ChevronRight, MessageSquare, Star, Tag, 
  Clock, ThumbsUp, Download, Printer, ExternalLink,
  PlayCircle, CheckCircle2, User
} from 'lucide-react';

const ResourcesContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Demo health resources
  const healthResources = [
    {
      id: 'RES-001',
      title: 'Understanding Hypertension',
      type: 'article',
      category: 'heart',
      date: 'June 10, 2024',
      author: 'Dr. James Wilson',
      summary: 'A comprehensive guide to understanding high blood pressure, its causes, effects, and management strategies.',
      readTime: '8 min read',
      tags: ['blood pressure', 'heart health', 'lifestyle'],
      recommended: true
    },
    {
      id: 'RES-002',
      title: 'Healthy Eating for Heart Health',
      type: 'video',
      category: 'nutrition',
      date: 'May 15, 2024',
      author: 'Sarah Johnson, RD',
      summary: 'Learn about heart-healthy eating patterns and how to incorporate them into your daily life.',
      duration: '12:45',
      tags: ['nutrition', 'diet', 'heart health'],
      recommended: true
    },
    {
      id: 'RES-003',
      title: 'Managing Cholesterol Levels',
      type: 'article',
      category: 'heart',
      date: 'April 22, 2024',
      author: 'Dr. Michael Chen',
      summary: 'Information about cholesterol, including the difference between HDL and LDL, and strategies for management.',
      readTime: '6 min read',
      tags: ['cholesterol', 'heart health', 'diet'],
      recommended: false
    },
    {
      id: 'RES-004',
      title: 'Stress Reduction Techniques',
      type: 'audio',
      category: 'mental',
      date: 'March 8, 2024',
      author: 'Dr. Emily Roberts',
      summary: 'Guided meditation and techniques to reduce stress, which can help manage blood pressure and overall health.',
      duration: '18:20',
      tags: ['stress', 'mental health', 'meditation'],
      recommended: true
    },
    {
      id: 'RES-005',
      title: 'Understanding Your Medication',
      type: 'article',
      category: 'medications',
      date: 'February 14, 2024',
      author: 'Dr. Sarah Johnson',
      summary: 'Information about common medications for hypertension, including how they work and potential side effects.',
      readTime: '10 min read',
      tags: ['medications', 'side effects', 'treatment'],
      recommended: false
    },
    {
      id: 'RES-006',
      title: 'Exercise for Heart Health',
      type: 'video',
      category: 'fitness',
      date: 'January 30, 2024',
      author: 'Mark Davis, PT',
      summary: 'Cardio exercises that are safe and effective for people with high blood pressure or other cardiovascular issues.',
      duration: '15:30',
      tags: ['exercise', 'fitness', 'heart health'],
      recommended: true
    }
  ];
  
  // Filter resources based on search query and active category
  const filteredResources = healthResources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(resource => 
      activeCategory === 'all' || 
      resource.category === activeCategory ||
      (activeCategory === 'recommended' && resource.recommended)
    );
  
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5 text-trustBlue-400" />;
      case 'video':
        return <VideoIcon className="h-5 w-5 text-red-400" />;
      case 'audio':
        return <PlayCircle className="h-5 w-5 text-green-400" />;
      default:
        return <Book className="h-5 w-5 text-trustBlue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Health Resources</h2>
          <p className="text-sm text-neutral-400">Educational materials tailored to your health needs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-neutral-700 hover:bg-neutral-700">
            <MessageSquare className="mr-1.5 h-4 w-4" />
            Ask a Question
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 space-y-4">
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base text-white">Recommended for You</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
                    className="w-full bg-neutral-800 border-neutral-700 pl-9 pr-4 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription className="text-xs">Personalized health information</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pt-2 pb-4">
              <Tabs defaultValue="all" onValueChange={setActiveCategory}>
                <TabsList className="bg-neutral-800 border border-neutral-700 mb-4">
                  <TabsTrigger 
                    value="all" 
                    className="text-xs data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="heart" 
                    className="text-xs data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
                  >
                    Heart Health
                  </TabsTrigger>
                  <TabsTrigger 
                    value="medications" 
                    className="text-xs data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
                  >
                    Medications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="nutrition" 
                    className="text-xs data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
                  >
                    Nutrition
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recommended" 
                    className="text-xs data-[state=active]:bg-trustBlue-950 data-[state=active]:text-trustBlue-400"
                  >
                    Recommended
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-4">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                      <div key={resource.id} className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 hover:border-trustBlue-600 transition-colors">
                        <div className="flex gap-3">
                          <div className="h-12 w-12 rounded-lg bg-trustBlue-900/50 flex items-center justify-center">
                            {getResourceTypeIcon(resource.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h3 className="text-sm font-medium text-white">{resource.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                                  <span className="flex items-center">
                                    <User className="mr-1 h-3 w-3" />
                                    {resource.author}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {resource.readTime || resource.duration}
                                  </span>
                                </div>
                              </div>
                              
                              {resource.recommended && (
                                <Badge variant="outline" className="text-amber-400 border-amber-400/30 h-5">
                                  <Star className="mr-1 h-3 w-3" />
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-xs text-neutral-400 mt-2 mb-3">{resource.summary}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {resource.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs h-5 bg-neutral-700">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Bookmark className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Share className="h-3 w-3" />
                                </Button>
                                <Button variant="trust" size="sm" className="h-6 px-2 text-xs">
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-neutral-400">
                      <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p>No resources found matching your criteria</p>
                      <Button variant="trust" size="sm" className="mt-3" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="neo-card bg-neutral-900 border-neutral-800">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-base text-white">Health Videos</CardTitle>
                <CardDescription className="text-xs">Informative video content</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="relative h-32 rounded-md overflow-hidden bg-neutral-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <PlayCircle className="h-8 w-8 text-white" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-xs font-medium text-white">Healthy Eating for Heart Health</h4>
                      <p className="text-xs text-neutral-300">12:45 • Sarah Johnson, RD</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs h-5">
                        <VideoIcon className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                      <span className="text-xs text-neutral-400">1.2K views</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-7 mt-3">
                  <span>View all videos</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="neo-card bg-neutral-900 border-neutral-800">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-base text-white">Downloadable Resources</CardTitle>
                <CardDescription className="text-xs">Printable guides and forms</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                    <div className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-trustBlue-400" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Medication Tracker Template</h4>
                        <p className="text-xs text-neutral-400">PDF • 2 pages</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                    <div className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-trustBlue-400" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">Blood Pressure Log Sheet</h4>
                        <p className="text-xs text-neutral-400">PDF • 4 pages</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-7 mt-3">
                  <span>View all downloads</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="w-full md:w-1/4 space-y-4">
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-white">Personal Collection</CardTitle>
              <CardDescription className="text-xs">Saved resources</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-trustBlue-400" />
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-white">Understanding Hypertension</h4>
                    </div>
                    <Badge variant="outline" className="text-xs h-5">
                      <Bookmark className="mr-1 h-3 w-3" />
                      Saved
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                  <div className="flex items-center gap-2">
                    <VideoIcon className="h-4 w-4 text-red-400" />
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-white">Exercise for Heart Health</h4>
                    </div>
                    <Badge variant="outline" className="text-xs h-5">
                      <Bookmark className="mr-1 h-3 w-3" />
                      Saved
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-7 mt-3">
                <span>View all saved</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-white">Related Topics</CardTitle>
              <CardDescription className="text-xs">Explore more health topics</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <Heart className="mr-1.5 h-4 w-4 text-red-400" />
                  Heart Health
                </Button>
                
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <FileText className="mr-1.5 h-4 w-4 text-amber-400" />
                  Cholesterol Management
                </Button>
                
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <FileText className="mr-1.5 h-4 w-4 text-green-400" />
                  Healthy Eating
                </Button>
                
                <Button variant="outline" className="w-full justify-start border-neutral-700 hover:bg-neutral-700">
                  <FileText className="mr-1.5 h-4 w-4 text-trustBlue-400" />
                  Stress Management
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="neo-card bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-white">External Resources</CardTitle>
              <CardDescription className="text-xs">Trusted health websites</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <Button variant="link" className="w-full justify-start p-0 h-auto">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-trustBlue-400" />
                  American Heart Association
                </Button>
                
                <Button variant="link" className="w-full justify-start p-0 h-auto">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-trustBlue-400" />
                  CDC - Heart Disease
                </Button>
                
                <Button variant="link" className="w-full justify-start p-0 h-auto">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-trustBlue-400" />
                  National Institutes of Health
                </Button>
                
                <Button variant="link" className="w-full justify-start p-0 h-auto">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-trustBlue-400" />
                  Mayo Clinic
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourcesContent;
