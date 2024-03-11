"use client";

import {
    useAddInitialScheduleMutation,
    useGetInitialScheduleQuery,
} from "@/redux/services/scheduleApi";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const WeeklyScheduleForm = () => {
    const { register, control, handleSubmit, watch, setValue, reset } = useForm(
        {
            defaultValues: {
                weeklySchedule: [
                    { day: "Monday", timeBlocks: [] },
                    { day: "Tuesday", timeBlocks: [] },
                    { day: "Wednesday", timeBlocks: [] },
                    { day: "Thursday", timeBlocks: [] },
                    { day: "Friday", timeBlocks: [] },
                    { day: "Saturday", timeBlocks: [] },
                    { day: "Sunday", timeBlocks: [] },
                ],
            },
        }
    );
    const { fields } = useFieldArray({ control, name: "weeklySchedule" });
    const {
        data: scheduleData,
        isSuccess,
        refetch,
    } = useGetInitialScheduleQuery();
    const [addInitialSchedule] = useAddInitialScheduleMutation();

    useEffect(() => {
        if (isSuccess && scheduleData) {
            reset({ weeklySchedule: scheduleData.weeklySchedule });
        }
    }, [isSuccess, scheduleData]);

    const onSubmit = async (data) => {
        try {
            await addInitialSchedule(data)
                .unwrap()
                .then(() => {
                    toast.success("Schedule updated successfully.");
                    refetch();
                })
                .catch((error) => {
                    toast.error("Failed to update the schedule.");
                    console.error("Failed to update the schedule:", error);
                });
            console.log("Schedule updated successfully");
        } catch (error) {
            console.error("Failed to update the schedule:", error);
            toast.error("Failed to update the schedule.");
        }
    };

    const addTimeBlock = (dayIndex) => {
        const newTimeBlock = {
            reason: "",
            startTime: "",
            endTime: "",
            subject: "",
            location: "",
        };
        const timeBlocksPath = `weeklySchedule.${dayIndex}.timeBlocks`;
        const updatedTimeBlocks = [...watch(timeBlocksPath), newTimeBlock];
        setValue(timeBlocksPath, updatedTimeBlocks);
    };

    const removeTimeBlock = (dayIndex, blockIndex) => {
        const timeBlocksPath = `weeklySchedule.${dayIndex}.timeBlocks`;
        const updatedTimeBlocks = [...watch(timeBlocksPath)];
        updatedTimeBlocks.splice(blockIndex, 1);
        setValue(timeBlocksPath, updatedTimeBlocks);
    };

    return (
        <section className="flex flex-col items-center lg:w-[1280px] min-h-screen  mx-auto py-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 w-full"
            >
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4 capitalize text-center">
                    Update your weekly blocked time slots
                </h2>
                {fields.map((field, dayIndex) => (
                    <div key={field.id} className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-600">
                            {field.day}
                        </h3>
                        {watch(`weeklySchedule.${dayIndex}.timeBlocks`).map(
                            (block, blockIndex) => (
                                <div
                                    key={blockIndex}
                                    className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                                >
                                    <select
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.reason`
                                        )}
                                        className="block mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="" disabled>
                                            Select Reason
                                        </option>
                                        <option value="other">Other</option>
                                        <option value="work">Work</option>
                                        <option value="class">Class</option>
                                        <option value="study">Study</option>
                                    </select>
                                    <input
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.startTime`
                                        )}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        type="time"
                                        placeholder="Start Time"
                                    />
                                    <input
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.endTime`
                                        )}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        type="time"
                                        placeholder="End Time"
                                    />
                                    <input
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.subject`
                                        )}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        placeholder="Subject / Location"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTimeBlock(
                                                dayIndex,
                                                blockIndex
                                            )
                                        }
                                        className="bg-red-500 hover:bg-red-700 text-white rounded-md py-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        )}
                        <button
                            type="button"
                            onClick={() => addTimeBlock(dayIndex)}
                            className="bg-slate-700 hover:bg-slate-900 text-sm text-white rounded-md p-2 flex justify-center items-center gap-1"
                        >
                            <FaPlus /> Add New
                        </button>
                    </div>
                ))}
                <input
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white rounded-md cursor-pointer p-2"
                    value="Update Schedule"
                />
            </form>
        </section>
    );
};

export default WeeklyScheduleForm;
