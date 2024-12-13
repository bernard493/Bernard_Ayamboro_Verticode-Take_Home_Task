export type ProjectStatusType = "Not Started" | "In Progress" | "Completed";
export interface IProject {
  projectName: string;
  description: string;
  startDate: Date;
  status: ProjectStatusType;
}
