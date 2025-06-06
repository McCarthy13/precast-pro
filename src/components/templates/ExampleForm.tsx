
import React from 'react';
import DocumentTemplate from './DocumentTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ExampleForm = () => {
  return (
    <DocumentTemplate
      title="Quality Control Inspection Form"
      documentNumber="QC-FORM-001"
      version="Rev 2.1"
      creationDate="2024-01-15"
      author="Sarah Johnson"
      reviewDate="2024-07-15"
      approvedBy="Mike Chen"
    >
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>Enter basic project details for this inspection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="Enter project name" />
            </div>
            <div>
              <Label htmlFor="project-number">Project Number</Label>
              <Input id="project-number" placeholder="Enter project number" />
            </div>
          </div>
          <div>
            <Label htmlFor="inspector">Inspector Name</Label>
            <Input id="inspector" placeholder="Enter inspector name" />
          </div>
          <div>
            <Label htmlFor="notes">Inspection Notes</Label>
            <Textarea id="notes" placeholder="Enter inspection details..." rows={4} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 mt-6">
        <Button variant="outline">Save Draft</Button>
        <Button>Submit for Review</Button>
      </div>
    </DocumentTemplate>
  );
};

export default ExampleForm;
