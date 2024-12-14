import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { IProject } from "../../models/Project";
import { RiArrowDropDownLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  handleFormSubmit: (data: IProject) => void;
}

interface FieldError {
  type: string;
  message: string;
}

// Custom resolver function for form validation
const resolver: Resolver<IProject> = async (values) => {
  const errors: Record<string, FieldError> = {};

  if (!values.projectName) {
    errors.projectName = {
      type: "required",
      message: "Project Name is required.",
    };
  }

  if (!values.description) {
    errors.description = {
      type: "required",
      message: "Description is required.",
    };
  }

  if (!values.status) {
    errors.status = {
      type: "required",
      message: "Status is required.",
    };
  }

  // Return validated values if there are no errors, or an empty object otherwise
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const ProjectForm: React.FC<Props> = ({ handleFormSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProject>({ resolver });

  const onSubmit = handleSubmit((data) => {
    handleFormSubmit({ ...data, startDate });
  });

  return (
    <section className="flex flex-grow items-center justify-center  pt-10">
      <form onSubmit={onSubmit} className="w-full sm:w-[35rem] p-5">
        {/* Form Header */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            New Project
          </h2>
          {/* Form Fields */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Project Name Input */}
            <div className="sm:col-span-4">
              <label
                htmlFor="projectName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Project Name
              </label>
              <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  {...register("projectName", {
                    required: "Project Name is required",
                  })}
                  id="projectName"
                  name="projectName"
                  type="text"
                  placeholder="Enter Project Name"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
              {errors.projectName && (
                <p className="text-red-500 mt-2">
                  {errors.projectName.message}
                </p>
              )}
            </div>

            {/* Description Input */}
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Write a few sentences about the project."
                />
              </div>
              {errors.description && (
                <p className="text-red-500 mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="sm:col-span-3">
              <label
                htmlFor="status"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Status
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  {...register("status", { required: "Status is required" })}
                  id="status"
                  name="status"
                  defaultValue=""
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <RiArrowDropDownLine
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-7"
                />
              </div>
              {errors.status && (
                <p className="text-red-500 mt-2">{errors.status.message}</p>
              )}
            </div>
            {/* Start Date Picker */}
            <div className="sm:col-span-3">
              <label
                htmlFor="startDate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2 grid grid-cols-1">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date.getTime())) {
                      setStartDate(date);
                    }
                  }}
                  dateFormat="MM/dd/yyyy"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#133A30] px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#29816b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProjectForm;
