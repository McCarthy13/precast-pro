
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIGenerator from './document-creator/AIGenerator';
import FormBuilder from './document-creator/FormBuilder';
import FormPreview from './document-creator/FormPreview';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date' | 'time';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface DocumentCreatorProps {
  departmentName: string;
  departmentCode: string;
}

const DocumentCreator: React.FC<DocumentCreatorProps> = ({ departmentName, departmentCode }) => {
  const [activeTab, setActiveTab] = useState("ai-generator");
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const { toast } = useToast();

  const handleFormGenerated = (fields: FormField[], name: string, description: string) => {
    setFormFields(fields);
    setDocumentName(name);
    setDocumentDescription(description);
  };

  const addField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(fields => 
      fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFormFields(fields => fields.filter(field => field.id !== id));
  };

  const saveDocument = () => {
    if (!documentName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a document name.",
        variant: "destructive",
      });
      return;
    }

    if (formFields.length === 0) {
      toast({
        title: "Error", 
        description: "Please add at least one field to the form.",
        variant: "destructive",
      });
      return;
    }

    // Generate document number
    const docNumber = `${departmentCode}-${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Document Saved!",
      description: `${documentName} has been saved as ${docNumber} and sent to Document Management for approval.`,
    });
    
    // Reset form
    setDocumentName("");
    setDocumentDescription("");
    setFormFields([]);
    setActiveTab("ai-generator");
  };

  const clearAll = () => {
    setDocumentName("");
    setDocumentDescription("");
    setFormFields([]);
    setActiveTab("ai-generator");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Document Creator</h3>
          <p className="text-gray-600">Create new forms and documents for {departmentName}</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {departmentCode}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
          <TabsTrigger value="form-builder">Form Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-generator" className="space-y-6">
          <AIGenerator
            departmentName={departmentName}
            onFormGenerated={handleFormGenerated}
            onTabChange={setActiveTab}
          />
        </TabsContent>

        <TabsContent value="form-builder" className="space-y-6">
          <FormBuilder
            documentName={documentName}
            documentDescription={documentDescription}
            formFields={formFields}
            onDocumentNameChange={setDocumentName}
            onDocumentDescriptionChange={setDocumentDescription}
            onAddField={addField}
            onUpdateField={updateField}
            onRemoveField={removeField}
          />
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <FormPreview
            documentName={documentName}
            documentDescription={documentDescription}
            formFields={formFields}
            departmentName={departmentName}
          />
        </TabsContent>
      </Tabs>

      {(documentName || formFields.length > 0) && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={clearAll}>
            Clear All
          </Button>
          <Button onClick={saveDocument} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save & Submit for Approval
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentCreator;
