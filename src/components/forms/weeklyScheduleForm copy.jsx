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
    const { fields, append } = useFieldArray({
        control,
        name: "weeklySchedule",
    });

    const onSubmit = (data) => console.log(data);

    // Function to add a new timeBlock to a specific day
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                    <h3 className="text-lg font-semibold">{field.day}</h3>
                    {watch(`weeklySchedule.${index}.timeBlocks`).map(
                        (block, blockIndex) => (
                            <div
                                key={blockIndex}
                                className="grid grid-cols-4 gap-2"
                            >
                                <input
                                    {...register(
                                        `weeklySchedule.${index}.timeBlocks.${blockIndex}.reason`
                                    )}
                                    className="input"
                                    placeholder="Reason"
                                />
                                <input
                                    {...register(
                                        `weeklySchedule.${index}.timeBlocks.${blockIndex}.startTime`
                                    )}
                                    className="input"
                                    type="time"
                                    placeholder="Start Time"
                                />
                                <input
                                    {...register(
                                        `weeklySchedule.${index}.timeBlocks.${blockIndex}.endTime`
                                    )}
                                    className="input"
                                    type="time"
                                    placeholder="End Time"
                                />
                                <input
                                    {...register(
                                        `weeklySchedule.${index}.timeBlocks.${blockIndex}.subject`
                                    )}
                                    className="input"
                                    placeholder="Subject"
                                />
                                {/* Optionally add location and remove button */}
                            </div>
                        )
                    )}
                    <button
                        type="button"
                        onClick={() => addTimeBlock(index)}
                        className="btn btn-primary"
                    >
                        Add Time Block
                    </button>
                </div>
            ))}
            <input
                type="submit"
                className="btn btn-success"
                value="Update Schedule"
            />
        </form>
    );
};

export default WeeklyScheduleForm;
