import React from "react";
import { IProject } from "../../models/Project";
import { useNavigate } from "react-router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface Props {
  project: IProject | null;
  handleUpdateProjectStatus: (
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => void;
}

const projectsStatus: string[] = ["Not Started", "In Progress", "Completed"];

const ProjectDetails: React.FC<Props> = ({
  project,
  handleUpdateProjectStatus,
}) => {
  const navigate = useNavigate();

  // Get day, month, and year components
  const day = project?.startDate.getDate();
  const month = project?.startDate.toLocaleString("default", {
    month: "short",
  });
  const year = project?.startDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

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
            <li className="flex justify-between gap-x-6 p-5 rounded-lg border border-3 hover:bg-slate-50">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {project.projectName}
                  </p>
                  <p className="mt-1  text-xs/5 text-gray-500">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">{formattedDate}</p>

                <Menu as="div" className="inline-block text-left mt-3">
                  <div>
                    <MenuButton
                      className={`inline-flex w-full justify-center items-center align-bottom gap-x-1.5 rounded-md ${
                        project.status === "Not Started"
                          ? "bg-red-500/20"
                          : project.status === "In Progress"
                          ? "bg-yellow-500/20"
                          : "bg-emerald-500/20"
                      } px-2  font-semibold text-gray-900   ring-gray-300 hover:${
                        project.status === "Not Started"
                          ? "bg-red-500/50"
                          : project.status === "In Progress"
                          ? "bg-yellow-500/50"
                          : "bg-emerald-500/50"
                      } `}
                    >
                      <p
                        className={`${
                          project.status === "Not Started"
                            ? "text-red-500"
                            : project.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-emerald-500"
                        } text-xs/5`}
                      >
                        {project?.status}
                      </p>
                      <RiArrowDropDownLine
                        aria-hidden="true"
                        className={`pointer-events-none  size-5 self-center ${
                          project.status === "Not Started"
                            ? "text-red-500"
                            : project.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-emerald-500"
                        }  sm:size-7`}
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {projectsStatus
                        .filter((status) => status !== project.status)
                        .map((status) => (
                          <MenuItem key={status}>
                            <button
                              onClick={() =>
                                handleUpdateProjectStatus(
                                  status as
                                    | "Not Started"
                                    | "In Progress"
                                    | "Completed"
                                )
                              }
                              className="block px-2 py-2 text-sm w-full text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              {status}
                            </button>
                          </MenuItem>
                        ))}
                    </div>
                  </MenuItems>
                </Menu>
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
