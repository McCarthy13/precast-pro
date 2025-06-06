
import React from 'react';
import DocumentTemplate from './DocumentTemplate';
import MoistureTestCard from '../qc/moisture/MoistureTestCard';

const MoistureTestForm = () => {
  return (
    <DocumentTemplate
      title="Moisture Test Data Form"
      documentNumber="QC-MT-001"
      version="Rev 1.0"
      creationDate="2024-01-15"
      author="Quality Control Department"
      reviewDate="2024-07-15"
      approvedBy="QC Manager"
    >
      <MoistureTestCard />
    </DocumentTemplate>
  );
};

export default MoistureTestForm;
