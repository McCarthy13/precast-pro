
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date' | 'time';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormPreviewProps {
  documentName: string;
  documentDescription: string;
  formFields: FormField[];
  departmentName: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({
  documentName,
  documentDescription,
  formFields,
  departmentName
}) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return <Input placeholder={field.placeholder} disabled />;
      case 'number':
        return <Input type="number" placeholder={field.placeholder} disabled />;
      case 'textarea':
        return <Textarea placeholder={field.placeholder} disabled />;
      case 'select':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" disabled />
            <span className="text-sm">{field.placeholder}</span>
          </div>
        );
      case 'date':
        return <Input type="date" disabled />;
      case 'time':
        return <Input type="time" disabled />;
      default:
        return <Input placeholder={field.placeholder} disabled />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Form Preview
        </CardTitle>
        <CardDescription>
          Preview how your form will look to users
        </CardDescription>
      </CardHeader>
      <CardContent>
        {documentName ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold">{documentName}</h3>
              {documentDescription && (
                <p className="text-gray-600 mt-1">{documentDescription}</p>
              )}
              <div className="flex space-x-2 mt-2">
                <Badge variant="outline">Department: {departmentName}</Badge>
                <Badge variant="outline">Status: Draft</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              {formFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
              
              {formFields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No fields to preview. Add fields in the Form Builder tab.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Enter a document name in the Form Builder to see the preview.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormPreview;
