
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Wand2, Plus, Save, Eye, FileText, Trash2, Edit3, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [isListening, setIsListening] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock AI form generation
  const generateFormWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description of the form you want to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock generated form based on prompt
    const mockFields: FormField[] = [
      {
        id: "date",
        type: "date",
        label: "Test Date",
        required: true
      },
      {
        id: "operator",
        type: "text", 
        label: "Operator Name",
        placeholder: "Enter operator name",
        required: true
      },
      {
        id: "batch_number",
        type: "text",
        label: "Batch Number",
        placeholder: "Enter batch number",
        required: true
      },
      {
        id: "test_type",
        type: "select",
        label: "Test Type",
        required: true,
        options: ["Compression", "Slump", "Air Content", "Temperature"]
      },
      {
        id: "results",
        type: "number",
        label: "Test Results",
        placeholder: "Enter numerical result",
        required: true
      },
      {
        id: "pass_fail",
        type: "select",
        label: "Pass/Fail",
        required: true,
        options: ["Pass", "Fail"]
      },
      {
        id: "notes",
        type: "textarea",
        label: "Additional Notes",
        placeholder: "Enter any additional observations",
        required: false
      }
    ];

    setFormFields(mockFields);
    setDocumentName(`${departmentName} Inspection Form`);
    setDocumentDescription(`AI-generated form for ${aiPrompt.toLowerCase()}`);
    setIsGenerating(false);
    setActiveTab("form-builder");
    
    toast({
      title: "Form Generated!",
      description: "AI has created a form based on your description. You can now customize it further.",
    });
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
    setAiPrompt("");
    setActiveTab("ai-generator");
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Mock voice recognition
      toast({
        title: "Listening...",
        description: "Speak now to describe your form requirements.",
      });
    }
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="h-5 w-5 mr-2" />
                AI-Powered Form Generator
              </CardTitle>
              <CardDescription>
                Describe what you want your form to accomplish, and AI will create it for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Describe your form requirements:</label>
                <div className="relative">
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Example: Create a precast beam inspection form that tracks dimensions, concrete strength, surface quality, and any defects found during inspection..."
                    className="min-h-32"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className={`absolute bottom-3 right-3 ${isListening ? 'bg-red-100 text-red-600' : ''}`}
                    onClick={toggleListening}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={generateFormWithAI}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Form...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Form with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form-builder" className="space-y-6">
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
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="Enter document name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Document Description</label>
                  <Input
                    value={documentDescription}
                    onChange={(e) => setDocumentDescription(e.target.value)}
                    placeholder="Brief description of the document"
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Form Fields</h4>
                  <Button variant="outline" onClick={addField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {formFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium">Field {index + 1}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeField(field.id)}
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
                            onValueChange={(value) => updateField(field.id, { type: value as FormField['type'] })}
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
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            placeholder="Field label"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Placeholder</label>
                          <Input
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            placeholder="Placeholder text"
                          />
                        </div>
                      </div>
                      
                      {field.type === 'select' && (
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Options (comma separated)</label>
                          <Input
                            value={field.options?.join(', ') || ''}
                            onChange={(e) => updateField(field.id, { 
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
                          onChange={(e) => updateField(field.id, { required: e.target.checked })}
                          className="rounded"
                        />
                        <label htmlFor={`required-${field.id}`} className="text-sm">
                          Required field
                        </label>
                      </div>
                    </div>
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
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
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
                        
                        {field.type === 'text' && (
                          <Input placeholder={field.placeholder} disabled />
                        )}
                        {field.type === 'number' && (
                          <Input type="number" placeholder={field.placeholder} disabled />
                        )}
                        {field.type === 'textarea' && (
                          <Textarea placeholder={field.placeholder} disabled />
                        )}
                        {field.type === 'select' && (
                          <Select disabled>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </Select>
                        )}
                        {field.type === 'checkbox' && (
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" disabled />
                            <span className="text-sm">{field.placeholder}</span>
                          </div>
                        )}
                        {field.type === 'date' && (
                          <Input type="date" disabled />
                        )}
                        {field.type === 'time' && (
                          <Input type="time" disabled />
                        )}
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
        </TabsContent>
      </Tabs>

      {(documentName || formFields.length > 0) && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => {
            setDocumentName("");
            setDocumentDescription("");
            setFormFields([]);
            setAiPrompt("");
            setActiveTab("ai-generator");
          }}>
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
