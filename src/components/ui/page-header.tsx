
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backLink?: string;
  backText?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backLink, 
  backText = "Back",
  children 
}) => {
  return (
    <header className="construction-gradient text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {backLink && (
              <Link to={backLink}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {backText}
                </Button>
              </Link>
            )}
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-blue-100 mt-1">{subtitle}</p>
            </div>
          </div>
          {children && (
            <div className="flex items-center space-x-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
