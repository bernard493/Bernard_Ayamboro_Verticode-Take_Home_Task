export interface IProject {
    projectName: string;
    description: string;
    startDate: Date;
    status: "Not Started" | "In Progress" | "Completed";
}
