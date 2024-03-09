"use client";

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

    const onSubmit = (data) => console.log(data);

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
        <div className="max-w-4xl mx-auto mt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white p-8 rounded-lg shadow"
            >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Update Weekly Schedule
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
                                        className="input w-full border-gray-300 rounded-md shadow-sm"
                                        type="time"
                                        placeholder="Start Time"
                                    />
                                    <input
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.endTime`
                                        )}
                                        className="input w-full border-gray-300 rounded-md shadow-sm"
                                        type="time"
                                        placeholder="End Time"
                                    />
                                    <input
                                        {...register(
                                            `weeklySchedule.${dayIndex}.timeBlocks.${blockIndex}.subject`
                                        )}
                                        className="input w-full border-gray-300 rounded-md shadow-sm"
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
                                        className="btn bg-red-500 hover:bg-red-700 text-white rounded-md"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        )}
                        <button
                            type="button"
                            onClick={() => addTimeBlock(dayIndex)}
                            className="btn bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                        >
                            Add Time Block
                        </button>
                    </div>
                ))}
                <input
                    type="submit"
                    className="btn bg-green-500 hover:bg-green-700 text-white rounded-md cursor-pointer"
                    value="Update Schedule"
                />
            </form>
        </div>
    );
};

export default WeeklyScheduleForm;
