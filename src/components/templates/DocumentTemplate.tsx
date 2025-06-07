
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DocumentTemplateProps {
  title: string;
  documentNumber: string;
  version: string;
  creationDate: string;
  author: string;
  reviewDate?: string;
  approvedBy?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const DocumentTemplate = ({
  title,
  documentNumber,
  version,
  creationDate,
  author,
  reviewDate,
  approvedBy,
  children,
  className = "",
  fullWidth = false
}: DocumentTemplateProps) => {
  return (
    <div className={`${fullWidth ? 'w-full px-4' : 'max-w-4xl mx-auto'} p-6 bg-white ${className}`}>
      {/* Header with Logo and Company Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img 
            src="/placeholder.svg" 
            alt="MOLIN Logo" 
            className="h-16 w-auto"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">MOLIN CONCRETE PRODUCTS</h1>
            <p className="text-sm text-gray-600">Quality Precast Solutions</p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {version}
          </Badge>
          <p className="text-xs text-gray-500 mt-1">Current Version</p>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Document Control Block */}
      <Card className="mb-6 border-l-4 border-l-blue-600">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Document Title</label>
              <p className="text-sm font-medium text-gray-800 mt-1">{title}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Document Number</label>
              <p className="text-sm font-medium text-gray-800 mt-1">{documentNumber}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Creation Date</label>
              <p className="text-sm font-medium text-gray-800 mt-1">{creationDate}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Author</label>
              <p className="text-sm font-medium text-gray-800 mt-1">{author}</p>
            </div>
            {reviewDate && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next Review</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{reviewDate}</p>
              </div>
            )}
            {approvedBy && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Approved By</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{approvedBy}</p>
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</label>
              <Badge className="bg-green-100 text-green-800 mt-1">
                Current
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Footer */}
      <Separator className="mt-8 mb-4" />
      <div className="text-center text-xs text-gray-500">
        <p>This document is controlled and maintained by MOLIN CONCRETE PRODUCTS</p>
        <p>Unauthorized reproduction or distribution is prohibited</p>
        <p className="mt-1">Document ID: {documentNumber} | Version: {version} | Created: {creationDate}</p>
      </div>
    </div>
  );
};

export default DocumentTemplate;
