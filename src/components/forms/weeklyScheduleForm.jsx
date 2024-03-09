"use client";

import {
    useAddInitialScheduleMutation,
    useGetInitialScheduleQuery,
} from "@/redux/services/scheduleApi";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const WeeklyScheduleForm = () => {
    const { register, control, handleSubmit, watch, setValue } = useForm({
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
    });
    const { fields } = useFieldArray({ control, name: "weeklySchedule" });
    const { data: scheduleData, isSuccess } = useGetInitialScheduleQuery();
    const [addInitialSchedule] = useAddInitialScheduleMutation();

    useEffect(() => {
        if (isSuccess && scheduleData) {
            reset({ weeklySchedule: scheduleData.weeklySchedule });
        }
    }, [isSuccess, scheduleData]);

    const onSubmit = async (data) => {
        try {
            await addInitialSchedule(data).unwrap();
            console.log("Schedule updated successfully");
        } catch (error) {
            console.error("Failed to update the schedule:", error);
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Update your weekly block time slots
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
                                    <input
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.reason`
                                        )}
                                        className="input w-full border-gray-300 rounded-md shadow-sm"
                                        placeholder="Reason"
                                    />
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
                                        placeholder="Subject"
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
                            className="btn bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"
                        >
                            Add Time Block
                        </button>
                    </div>
                ))}
                <input
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white rounded-md cursor-pointer p-2"
                    value="Update Schedule"
                />
            </form>
        </section>
    );
};

export default WeeklyScheduleForm;
