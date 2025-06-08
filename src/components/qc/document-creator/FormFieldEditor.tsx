
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GripVertical, Trash2 } from "lucide-react";

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date' | 'time';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormFieldEditorProps {
  field: FormField;
  index: number;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
  onRemove: (id: string) => void;
}

const FormFieldEditor: React.FC<FormFieldEditorProps> = ({
  field,
  index,
  onUpdate,
  onRemove
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium">Field {index + 1}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(field.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium">Field Type</label>
          <Select 
            value={field.type} 
            onValueChange={(value) => onUpdate(field.id, { type: value as FormField['type'] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="select">Dropdown</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="textarea">Textarea</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="time">Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-medium">Field Label</label>
          <Input
            value={field.label}
            onChange={(e) => onUpdate(field.id, { label: e.target.value })}
            placeholder="Field label"
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-medium">Placeholder</label>
          <Input
            value={field.placeholder || ''}
            onChange={(e) => onUpdate(field.id, { placeholder: e.target.value })}
            placeholder="Placeholder text"
          />
        </div>
      </div>
      
      {field.type === 'select' && (
        <div className="space-y-1">
          <label className="text-xs font-medium">Options (comma separated)</label>
          <Input
            value={field.options?.join(', ') || ''}
            onChange={(e) => onUpdate(field.id, { 
              options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
            })}
            placeholder="Option 1, Option 2, Option 3"
          />
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`required-${field.id}`}
          checked={field.required}
          onChange={(e) => onUpdate(field.id, { required: e.target.checked })}
          className="rounded"
        />
        <label htmlFor={`required-${field.id}`} className="text-sm">
          Required field
        </label>
      </div>
    </div>
  );
};

export default FormFieldEditor;
