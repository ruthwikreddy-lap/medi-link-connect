
import React, { useState } from "react";
import { Search, MessageSquare, User, ChevronRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockMessages } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { format, isToday, isYesterday } from "date-fns";

interface MessageUser {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'patient' | 'provider';
  lastSeen?: string;
}

const MessagesPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const userMessages = mockMessages.filter(message => 
    (profile?.user_type === "patient" && message.recipientId === "p1") ||
    (profile?.user_type === "provider" && message.recipientId === "d1")
  );
  
  const filteredMessages = userMessages.filter(message =>
    message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="pb-20">
      <Header 
        title="Messages" 
        showNotifications 
        showAvatar 
        avatarSrc={profile?.avatar_url} 
      />
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search messages"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {filteredMessages.length > 0 ? (
              filteredMessages.map(message => (
                <div 
                  key={message.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${!message.read ? 'bg-blue-50 border-blue-100' : 'bg-white'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={message.senderRole === "provider" ? "https://i.pravatar.cc/150?img=52" : undefined} />
                      <AvatarFallback className={message.senderRole === "provider" ? "bg-green-100 text-green-800" : "bg-medilink-100 text-medilink-800"}>
                        {getInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{message.senderName}</h3>
                        {!message.read && <Badge className="ml-2 bg-blue-500">New</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 mb-1">
                      {getMessageDate(message.timestamp)}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={40} className="mx-auto text-gray-300" />
                <p className="mt-2 text-gray-500">No messages found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread">
            {filteredMessages.filter(m => !m.read).length > 0 ? (
              filteredMessages.filter(m => !m.read).map(message => (
                <div 
                  key={message.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={message.senderRole === "provider" ? "https://i.pravatar.cc/150?img=52" : undefined} />
                      <AvatarFallback className={message.senderRole === "provider" ? "bg-green-100 text-green-800" : "bg-medilink-100 text-medilink-800"}>
                        {getInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{message.senderName}</h3>
                        <Badge className="ml-2 bg-blue-500">New</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 mb-1">
                      {getMessageDate(message.timestamp)}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={40} className="mx-auto text-gray-300" />
                <p className="mt-2 text-gray-500">No unread messages</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sent">
            <div className="text-center py-8">
              <MessageSquare size={40} className="mx-auto text-gray-300" />
              <p className="mt-2 text-gray-500">No sent messages found</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MessagesPage;
