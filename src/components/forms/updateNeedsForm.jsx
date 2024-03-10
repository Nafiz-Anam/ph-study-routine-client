"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
    useAddUserNeedsMutation,
    useGetUserNeedsQuery,
} from "@/redux/services/userApi";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const UpdateNeedsForm = () => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "needs",
    });

    const [addUserNeeds] = useAddUserNeedsMutation();
    const { data: needsData, isSuccess } = useGetUserNeedsQuery();

    useEffect(() => {
        if (isSuccess && needsData && needsData.needs) {
            reset({ needs: needsData.needs });
        }
    }, [isSuccess, needsData, reset]);

    const onSubmit = async (data) => {
        try {
            await addUserNeeds(data).unwrap();
            toast.success("Needs updated successfully");
        } catch (err) {
            console.error("Failed to update needs:", err);
            toast.error("Failed to update needs.");
        }
    };

    return (
        <section className="flex flex-col items-center pt-10 min-h-screen">
            <div className="w-full max-w-7xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Update Study Tasks
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-3 items-end">
                            <input
                                type="text"
                                {...register(`needs.${index}.name`)}
                                placeholder="Task Name"
                                className="flex-1 border-gray-300 p-2 rounded"
                            />
                            <input
                                type="number"
                                {...register(`needs.${index}.timeNeeded`)}
                                placeholder="Time Needed (min)"
                                className="border-gray-300 p-2 rounded"
                            />
                            <select
                                {...register(`needs.${index}.priority`)}
                                className="border-gray-300 p-2 rounded w-36"
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-white bg-red-500 hover:bg-red-700 rounded transition duration-150"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex flex-col gap-7 items-start">
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    name: "",
                                    timeNeeded: "",
                                    priority: "medium",
                                })
                            }
                            className="p-2 bg-slate-700 text-white hover:bg-slate-900 rounded transition duration-150 flex justify-center items-center gap-1 text-sm"
                        >
                            <FaPlus />
                            Add New
                        </button>
                        <input
                            type="submit"
                            value="Submit"
                            className="cursor-pointer py-2 px-3 bg-indigo-500 text-white hover:bg-indigo-700 rounded transition duration-150"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateNeedsForm;
