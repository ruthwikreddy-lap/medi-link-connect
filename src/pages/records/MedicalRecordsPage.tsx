
import React, { useState } from "react";
import { Search, FileText, FilePlus, FileImage, Filter } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockMedicalRecords } from "@/data/mockData";
import { MedicalRecord } from "@/models/types";
import { format } from "date-fns";

const MedicalRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRecords = mockMedicalRecords.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getRecordIcon = (category: string) => {
    switch (category) {
      case 'lab':
        return <FileText className="text-blue-500" />;
      case 'prescription':
        return <FilePlus className="text-medilink-600" />;
      case 'imaging':
        return <FileImage className="text-purple-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lab':
        return 'bg-blue-100 text-blue-800';
      case 'prescription':
        return 'bg-medilink-100 text-medilink-800';
      case 'imaging':
        return 'bg-purple-100 text-purple-800';
      case 'diagnosis':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const RecordCard = ({ record }: { record: MedicalRecord }) => (
    <div className="bg-white rounded-lg border p-4 mb-3">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          {getRecordIcon(record.category)}
          <div>
            <h3 className="font-medium">{record.title}</h3>
            <p className="text-sm text-gray-500">{format(new Date(record.date), "MMM d, yyyy")}</p>
          </div>
        </div>
        <Badge className={getCategoryColor(record.category)} variant="outline">
          {record.category}
        </Badge>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">{record.content}</p>
      
      {record.attachments && record.attachments.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Attachments:</p>
          {record.attachments.map((attachment, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-sm text-medilink-600 hover:underline flex items-center"
            >
              <FileText size={14} className="mr-1" />
              {attachment}
            </a>
          ))}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        Provider: {record.providerName}
      </div>
    </div>
  );

  return (
    <div className="pb-20">
      <Header title="Medical Records" showBackButton />
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search records"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Your Records</h2>
          <button className="flex items-center text-sm text-medilink-600">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="rx">Rx</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredRecords.map(record => (
              <RecordCard key={record.id} record={record} />
            ))}
          </TabsContent>
          
          <TabsContent value="labs">
            {filteredRecords
              .filter(record => record.category === "lab")
              .map(record => (
                <RecordCard key={record.id} record={record} />
              ))}
          </TabsContent>
          
          <TabsContent value="rx">
            {filteredRecords
              .filter(record => record.category === "prescription")
              .map(record => (
                <RecordCard key={record.id} record={record} />
              ))}
          </TabsContent>
          
          <TabsContent value="imaging">
            {filteredRecords
              .filter(record => record.category === "imaging")
              .map(record => (
                <RecordCard key={record.id} record={record} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
