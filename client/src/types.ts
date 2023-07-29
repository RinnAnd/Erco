export interface Project {
  system_id: number;
  system_name: string;
  location: string;
  inverter_brand: string;
  panel_brand: string;
  panel_power: number;
  panel_quantity: number;
  installed_power: number;
  current_generation: number;
  total_generation: number;
}

export type Projects = Project[];

export type Data = {
  data: {
    status: boolean;
    projects: Project[];
  };
};
