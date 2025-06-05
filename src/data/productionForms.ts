
import { ProductionForm } from "@/types/production";

export const precastForms: ProductionForm[] = [
  { id: "BL1", name: "Beam Line 1", department: "precast", capacity: 8, isActive: true, scheduledJobs: [] },
  { id: "BL2", name: "Beam Line 2", department: "precast", capacity: 8, isActive: true, scheduledJobs: [] },
  { id: "BL3", name: "Beam Line 3", department: "precast", capacity: 8, isActive: true, scheduledJobs: [] },
  { id: "BL6", name: "Beam Line 6", department: "precast", capacity: 8, isActive: true, scheduledJobs: [] },
  { id: "EPB-E", name: "East Panel Bed-East", department: "precast", capacity: 12, isActive: true, scheduledJobs: [] },
  { id: "EPB-W", name: "East Panel Bed-West", department: "precast", capacity: 12, isActive: true, scheduledJobs: [] },
  { id: "WPB-E", name: "West Panel Bed-East", department: "precast", capacity: 12, isActive: true, scheduledJobs: [] },
  { id: "WPB-W", name: "West Panel Bed-West", department: "precast", capacity: 12, isActive: true, scheduledJobs: [] },
  { id: "COL", name: "Columns", department: "precast", capacity: 6, isActive: true, scheduledJobs: [] },
  { id: "STADIA", name: "Stadia", department: "precast", capacity: 4, isActive: true, scheduledJobs: [] },
  { id: "MILD", name: "Mild Steel", department: "precast", capacity: 10, isActive: true, scheduledJobs: [] }
];

export const extrudedForms: ProductionForm[] = [
  { id: "EXT1", name: "Extruded 1", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT2", name: "Extruded 2", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT3", name: "Extruded 3", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT4", name: "Extruded 4", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT5", name: "Extruded 5", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT6", name: "Extruded 6", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT7", name: "Extruded 7", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] },
  { id: "EXT8", name: "Extruded 8", department: "extruded", capacity: 20, isActive: true, scheduledJobs: [] }
];

export const flexicoreForms: ProductionForm[] = [
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `12x24-${i + 1}`,
    name: `12x24 Form ${i + 1}`,
    department: "flexicore" as const,
    dimensions: "12x24",
    capacity: 1,
    isActive: true,
    scheduledJobs: []
  })),
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `8x24-${i + 1}`,
    name: `8x24 Form ${i + 1}`,
    department: "flexicore" as const,
    dimensions: "8x24",
    capacity: 1,
    isActive: true,
    scheduledJobs: []
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `12x16-${i + 1}`,
    name: `12x16 Form ${i + 1}`,
    department: "flexicore" as const,
    dimensions: "12x16",
    capacity: 1,
    isActive: true,
    scheduledJobs: []
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `8x16-${i + 1}`,
    name: `8x16 Form ${i + 1}`,
    department: "flexicore" as const,
    dimensions: "8x16",
    capacity: 1,
    isActive: true,
    scheduledJobs: []
  }))
];

export const wallPanelForms: ProductionForm[] = Array.from({ length: 24 }, (_, i) => ({
  id: `WP${i + 1}`,
  name: `Wall Panel Form ${i + 1}`,
  department: "wall-panels" as const,
  capacity: 6,
  isActive: true,
  scheduledJobs: []
}));

export const getAllForms = (): ProductionForm[] => [
  ...precastForms,
  ...extrudedForms,
  ...flexicoreForms,
  ...wallPanelForms
];

export const getFormsByDepartment = (department: string): ProductionForm[] => {
  switch (department) {
    case 'precast':
      return precastForms;
    case 'extruded':
      return extrudedForms;
    case 'flexicore':
      return flexicoreForms;
    case 'wall-panels':
      return wallPanelForms;
    default:
      return [];
  }
};
