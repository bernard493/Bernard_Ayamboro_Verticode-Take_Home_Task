export interface IProject {
    projectName: string;
    description: string;
    startDate: string;
    status: "Not Started" | "In Progress" | "Completed";
}
