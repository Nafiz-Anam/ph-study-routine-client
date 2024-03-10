"use client";

import React from "react";
import { useGetStudyPlanQuery } from "@/redux/services/userApi";

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
        <section className="flex flex-col items-center min-h-screen mx-auto py-10 max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                Comprehensive study plan of the week
            </h2>
            <div className="grid grid-cols-1 pt-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className="bg-white shadow overflow-hidden sm:rounded-lg"
                    >
                        <div className="px-4 py-5 sm:px-6 bg-gray-800 text-white">
                            <h3 className="text-lg leading-6 font-medium">
                                {day}
                            </h3>
                        </div>
                        <div className="border-t border-gray-200">
                            {studyPlan.studyPlan[day]?.length > 0 ? (
                                studyPlan.studyPlan[day].map((task, index) => (
                                    <div
                                        key={index}
                                        className={`px-4 py-5 ${
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        }`}
                                    >
                                        <p className="text-sm font-medium text-indigo-600">
                                            {task.name} ({task.priority})
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            Time Needed: {task.timeNeeded}{" "}
                                            minutes
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {task.startTime} - {task.endTime}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-5 bg-white text-sm text-gray-500">
                                    No tasks scheduled
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {studyPlan.studyPlan.unallocatedTasks &&
                    studyPlan.studyPlan.unallocatedTasks.length > 0 && (
                        <div className="col-span-full bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 bg-red-500 text-white">
                                <h3 className="text-lg leading-6 font-medium">
                                    Unallocated Tasks
                                </h3>
                            </div>
                            <div className="border-t border-gray-200">
                                {studyPlan.studyPlan.unallocatedTasks.map(
                                    (task, index) => (
                                        <div
                                            key={index}
                                            className={`px-4 py-5 ${
                                                index % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <p className="text-sm font-medium text-indigo-600">
                                                {task.name} ({task.priority})
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                Time Needed: {task.timeNeeded}{" "}
                                                minutes
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </section>
    );
};

export default RoutineDisplay;
