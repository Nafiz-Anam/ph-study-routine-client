"use client";

import React from "react";
import { useGetStudyPlanQuery } from "@/redux/services/userApi";
import { AiOutlineClockCircle, AiFillInfoCircle } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import Link from "next/link";
import RoutineLoader from "./loadings/routine";

const RoutineDisplay = () => {
    const { data: studyPlan, error, isLoading } = useGetStudyPlanQuery();

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-10 capitalize text-center">
                    Comprehensive Study Plan of the week
                </h2>
                {isLoading ? (
                    <RoutineLoader />
                ) : error ? (
                    <div className="text-center">
                        <h2>
                            Please update your <b>Block-Logs</b> and{" "}
                            <b>Todo tasks</b> to generate the routine.{" "}
                        </h2>
                        <div className="flex justify-center items-center gap-5 my-5">
                            <Link
                                href="/weeklyschedule"
                                className="font-semibold leading-6 text-white bg-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-500"
                            >
                                Update Block-logs
                            </Link>
                            <Link
                                href="/updateneeds"
                                className="font-semibold leading-6 border-4 border-indigo-600 px-3 py-1 rounded-md text-indigo-600 hover:text-indigo-500 hover:border-indigo-500"
                            >
                                Update todo tasks
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {daysOfWeek.map((day) => (
                            <DaySchedule
                                key={day}
                                day={day}
                                tasks={studyPlan?.data[day]}
                                freeTimeSlots={
                                    studyPlan.data.freeTimeSlots[day]
                                }
                            />
                        ))}
                        <UnallocatedTasks
                            tasks={studyPlan.data.unallocatedTasks}
                            freeTimeSlots={studyPlan.data.freeTimeSlots}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const DaySchedule = ({ day, tasks, freeTimeSlots }) => (
    <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 bg-indigo-600 text-white text-lg font-bold">
            {day}
        </div>
        <ul>
            {tasks?.length > 0 ? (
                tasks.map((task, index) => <TaskItem key={index} task={task} />)
            ) : (
                <div className="px-4 py-5 text-sm text-gray-500">
                    No tasks scheduled
                </div>
            )}
            <FreeTimeList freeTimeSlots={freeTimeSlots} />
        </ul>
    </div>
);

const priorityClasses = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-blue-500",
};

const TaskItem = ({ task }) => {
    return (
        <div className="bg-white flex justify-between items-center px-4 py-2 border-b last:border-b-0 border-gray-200">
            <BiTask className="h-5 w-5 text-indigo-600" />
            <div className="ml-4 flex-1">
                <p className="text-md uppercase font-medium text-indigo-600">
                    {task.name}
                </p>
                <p className="text-md text-gray-500">{`${task.startTime} - ${task.endTime}`}</p>
            </div>
            <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                    priorityClasses[task.priority]
                }`}
            >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
        </div>
    );
};

const FreeTimeList = ({ freeTimeSlots }) => (
    <>
        {freeTimeSlots.map((slot, index) => (
            <li
                key={index}
                className="px-4 py-4 flex items-center bg-green-100"
            >
                <AiOutlineClockCircle className="h-5 w-5 text-green-600" />
                <div className="ml-4">
                    <p className="text-sm text-green-900">
                        Free: {slot.start} - {slot.end}
                    </p>
                </div>
            </li>
        ))}
    </>
);

const UnallocatedTasks = ({ tasks, freeTimeSlots }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden col-span-full">
        <div className="px-4 py-5 bg-red-600 text-white text-lg font-bold">
            Unallocated Tasks & Suggestions
        </div>
        <ul>
            {tasks.map((task, index) => (
                <li
                    key={index}
                    className="px-4 py-4 flex flex-col border-b last:border-b-0 border-gray-200"
                >
                    <div className="flex items-center">
                        <AiFillInfoCircle className="h-5 w-5 text-red-500" />
                        <div className="ml-4 flex-1">
                            <div className="flex justify-between items-center">
                                <p className="text-md font-medium text-gray-900 uppercase">
                                    {task.name}
                                </p>
                                <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white capitalize ${
                                        priorityClasses[task.priority]
                                    }`}
                                >
                                    {task.priority}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500">
                                Time Needed: <b>{task.timeNeeded}</b> minutes
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 ml-9 text-sm text-gray-700">
                        <b>Suggestion:</b>{" "}
                        {suggestSplitForTask(task, freeTimeSlots)}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const suggestSplitForTask = () => {
    return "Check available free time slots to split this task into manageable chunks.";
};

export default RoutineDisplay;
