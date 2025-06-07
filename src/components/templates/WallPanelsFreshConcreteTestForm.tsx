
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DocumentTemplate from './DocumentTemplate';
import FreshConcreteTestCard from '../qc/fresh-concrete/FreshConcreteTestCard';

const WallPanelsFreshConcreteTestForm = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <Button variant="outline" onClick={handleBack} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      
      <DocumentTemplate
        title="Fresh Concrete Test Data Form - Wall Panels"
        documentNumber="QC-FCT-WP-001"
        version="Rev 1.0"
        creationDate="2024-01-15"
        author="Quality Control Department"
        reviewDate="2024-07-15"
        approvedBy="QC Manager"
        fullWidth={true}
      >
        <FreshConcreteTestCard departmentName="Wall Panels" />
      </DocumentTemplate>
    </div>
  );
};

export default WallPanelsFreshConcreteTestForm;
