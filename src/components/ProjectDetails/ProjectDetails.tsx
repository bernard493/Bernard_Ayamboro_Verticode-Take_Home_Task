import React from "react";
import { IProject } from "../../models/Project";
import { useNavigate } from "react-router";

interface Props {
  project: IProject;
  setProject: (newProject: IProject) => void;
}
const ProjectDetails: React.FC<Props> = ({ project, setProject }) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-grow items-center justify-center  pt-10 px-3 ">
      <div className="w-full sm:w-[35rem]">
        <div className="pb-20">
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-[#133A30] px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#29816b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New
          </button>
        </div>
        {project ? (
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 p-5 rounded-lg hover:bg-slate-100">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {project?.projectName}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {project?.description}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">21/25/2282</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div
                    className={`flex-none rounded-full bg-${
                      project?.status === "Not Started"
                        ? "red-500"
                        : project?.status === "In Progress"
                        ? "yellow-500"
                        : "emerald-500"
                    }/20 p-1`}
                  >
                    <div
                      className={`size-1.5 rounded-full bg-${
                        project?.status === "Not Started"
                          ? "red-500"
                          : project?.status === "In Progress"
                          ? "yellow-500"
                          : "emerald-500"
                      } `}
                    />
                  </div>
                  <p className="text-xs/5 text-gray-500">{project?.status}</p>
                </div>
              </div>
            </li>
          </ul>
        ) : (
          <div className="text-center text-2xl font-bold text-gray-900">
            No Projects Available
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
