
import React from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { format } from "date-fns";
import { Task } from "@/models/types";
import { Badge } from "@/components/ui/badge";

interface TasksListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, status: "pending" | "in-progress" | "completed" | "cancelled") => void;
}

export const TasksList: React.FC<TasksListProps> = ({ tasks, onUpdateTask }) => {
  const pendingTasks = tasks.filter(task => task.status !== "completed" && task.status !== "cancelled");
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border p-3 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button 
                  onClick={() => onUpdateTask(task.id, task.status === "pending" ? "completed" : "pending")}
                  className="mt-1"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="text-medilink-600" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                </button>
                
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      {task.priority}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      {task.category}
                    </Badge>
                  </div>
                  
                  {task.dueDate && (
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      Due {format(new Date(task.dueDate), "MMM d, h:mm a")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">
          <CheckCircle2 size={30} className="mx-auto text-green-500 mb-2" />
          <p>All tasks completed!</p>
        </div>
      )}
    </div>
  );
};
