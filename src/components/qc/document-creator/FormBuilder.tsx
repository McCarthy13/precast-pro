
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FileText } from "lucide-react";
import FormFieldEditor from './FormFieldEditor';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date' | 'time';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormBuilderProps {
  documentName: string;
  documentDescription: string;
  formFields: FormField[];
  onDocumentNameChange: (name: string) => void;
  onDocumentDescriptionChange: (description: string) => void;
  onAddField: () => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
  onRemoveField: (id: string) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  documentName,
  documentDescription,
  formFields,
  onDocumentNameChange,
  onDocumentDescriptionChange,
  onAddField,
  onUpdateField,
  onRemoveField
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Builder</CardTitle>
        <CardDescription>
          Customize your form fields and properties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Name *</label>
            <Input
              value={documentName}
              onChange={(e) => onDocumentNameChange(e.target.value)}
              placeholder="Enter document name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Description</label>
            <Input
              value={documentDescription}
              onChange={(e) => onDocumentDescriptionChange(e.target.value)}
              placeholder="Brief description of the document"
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Form Fields</h4>
            <Button variant="outline" onClick={onAddField}>
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>
          
          <div className="space-y-3">
            {formFields.map((field, index) => (
              <FormFieldEditor
                key={field.id}
                field={field}
                index={index}
                onUpdate={onUpdateField}
                onRemove={onRemoveField}
              />
            ))}
            
            {formFields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No fields added yet. Click "Add Field" to start building your form.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormBuilder;
