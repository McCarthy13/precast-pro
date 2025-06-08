
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date' | 'time';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface AIGeneratorProps {
  departmentName: string;
  onFormGenerated: (fields: FormField[], name: string, description: string) => void;
  onTabChange: (tab: string) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ 
  departmentName, 
  onFormGenerated, 
  onTabChange 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

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

    const documentName = `${departmentName} Inspection Form`;
    const documentDescription = `AI-generated form for ${aiPrompt.toLowerCase()}`;

    onFormGenerated(mockFields, documentName, documentDescription);
    setIsGenerating(false);
    onTabChange("form-builder");
    
    toast({
      title: "Form Generated!",
      description: "AI has created a form based on your description. You can now customize it further.",
    });
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Listening...",
        description: "Speak now to describe your form requirements.",
      });
    }
  };

  return (
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
  );
};

export default AIGenerator;
