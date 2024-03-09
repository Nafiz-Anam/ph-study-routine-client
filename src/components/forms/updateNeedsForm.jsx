"use client";

import { useForm, useFieldArray } from "react-hook-form";

const UpdateNeedsForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            needs: [{ name: "", timeNeeded: "", priority: "medium" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "needs",
    });

    const onSubmit = (data) => console.log(data);

    return (
        <section className="flex flex-col items-center pt-10 min-h-screen">
            <div className="w-full max-w-7xl  ">
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
                                className=" flex-1 border-gray-300 p-2 rounded"
                            />
                            <input
                                type="text"
                                {...register(`needs.${index}.timeNeeded`)}
                                placeholder="Time Needed (min)"
                                className=" border-gray-300 p-2 rounded "
                            />
                            <select
                                {...register(`needs.${index}.priority`)}
                                className=" border-gray-300 p-2 rounded w-36"
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
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    name: "",
                                    timeNeeded: "",
                                    priority: "medium",
                                })
                            }
                            className="p-2 bg-slate-500 text-white hover:bg-slate-700 rounded transition duration-150"
                        >
                            Add New
                        </button>
                        <input
                            type="submit"
                            value="Submit"
                            className="cursor-pointer py-2 px-3 bg-blue-500 text-white hover:bg-blue-700 rounded transition duration-150"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateNeedsForm;
