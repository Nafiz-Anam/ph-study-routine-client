"use client";
import React from "react";
import { useGetStudyPlanQuery } from "@/redux/services/userApi";
import { AiOutlineClockCircle, AiFillInfoCircle } from "react-icons/ai";
import { BiTask } from "react-icons/bi";

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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.toString()}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-10 capitalize text-center">
                    Comprehensive Study Plan of the week
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {daysOfWeek.map((day) => (
                        <DaySchedule
                            key={day}
                            day={day}
                            tasks={studyPlan.studyPlan[day]}
                            freeTimeSlots={
                                studyPlan.studyPlan.freeTimeSlots[day]
                            }
                        />
                    ))}
                    <UnallocatedTasks
                        tasks={studyPlan.studyPlan.unallocatedTasks}
                        freeTimeSlots={studyPlan.studyPlan.freeTimeSlots}
                    />
                </div>
            </div>
        </div>
    );
};

const DaySchedule = ({ day, tasks, freeTimeSlots }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
        {/* {tasks?.length > 0 ? (
            tasks.map((task, index) => <TaskItem key={index} task={task} />)
        ) : (
            <div className="px-4 py-5 text-sm text-gray-500">
                No tasks scheduled
            </div>
        )}
        <FreeTimeList freeTimeSlots={freeTimeSlots} /> */}
    </div>
);

const priorityClasses = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
};

const TaskItem = ({ task }) => {
    return (
        <div className="flex justify-between items-center px-4 py-2 border-b last:border-b-0 border-gray-200">
            <BiTask className="h-5 w-5 text-indigo-600" />
            <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-indigo-600">
                    {task.name}
                </p>
                <p className="text-sm text-gray-500">{`${task.startTime} - ${task.endTime}`}</p>
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
                <li key={index} className="px-4 py-4 flex flex-col">
                    <div className="flex items-center">
                        <AiFillInfoCircle className="h-5 w-5 text-red-500" />
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {task.name}{" "}
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white capitalize ${
                                        priorityClasses[task.priority]
                                    }`}
                                >
                                    {task.priority}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Time Needed: {task.timeNeeded} minutes
                            </p>
                        </div>
                    </div>
                    {/* <TaskItem key={index} task={task} /> */}
                    <div className="mt-2 ml-9 text-sm text-gray-700">
                        <b>Suggestion:</b>{" "}
                        {suggestSplitForTask(task, freeTimeSlots)}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const suggestSplitForTask = (task, freeTimeSlots) => {
    return "Check available free time slots to split this task into manageable chunks.";
};

export default RoutineDisplay;
