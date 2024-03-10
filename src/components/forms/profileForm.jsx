"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from "@/redux/services/userApi";
import toast from "react-hot-toast";
import ImageUploader from "../imageUploader";

const ProfileForm = () => {
    const {
        data: userProfile,
        error,
        isLoading,
        refetch,
    } = useGetUserProfileQuery();
    const [updateUserProfile, { isLoading: isUpdating }] =
        useUpdateUserProfileMutation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [selectedImage, setSelectedImage] = useState(null);
    console.log("selectedImage", selectedImage);
    const handleImageSelected = (file) => {
        setSelectedImage(file);
    };

    useEffect(() => {
        if (userProfile) {
            Object.entries(userProfile.profile).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [userProfile]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (
                ![
                    "email",
                    "_id",
                    "role",
                    "createdAt",
                    "profilePicture",
                ].includes(key)
            ) {
                formData.append(key, value);
            }
        });
        if (selectedImage) {
            formData.append("profilePicture", selectedImage);
        } else {
            formData.append(
                "profilePicture",
                userProfile?.profile.profilePicture
            );
        }

        try {
            await updateUserProfile(formData)
                .unwrap()
                .then(() => {
                    toast.success("Profile updated successfully.");
                    refetch();
                })
                .catch((error) => {
                    toast.error("Failed to update profile.");
                    console.error("Update failed", error);
                });
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error("Update failed", error);
        }
    };

    return (
        <section className="flex flex-col justify-center py-10 px-6 lg:px-8">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {userProfile && (
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize">
                        Update your information
                    </h2>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="flex justify-center items-start">
                                <ImageUploader
                                    defaultImageUrl={
                                        userProfile?.profile.profilePicture
                                    }
                                    onImageSelected={handleImageSelected}
                                />
                            </div>
                            <div className="flex gap-1">
                                <div>
                                    <label
                                        htmlFor="f_name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="text"
                                        placeholder="f_name"
                                        {...register("f_name", {})}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="l_name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="text"
                                        placeholder="l_name"
                                        {...register("l_name", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Mobile No.
                                    </label>
                                    <input
                                        className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="text"
                                        placeholder="mobile"
                                        {...register("mobile", {})}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        {...register("gender")}
                                        className="block w-[190px] mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <input
                                    className="block bg-gray-100 w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="email"
                                    disabled
                                    placeholder="email"
                                    {...register("email", { required: true })}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="education_level"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Education Level
                                </label>
                                <input
                                    className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    placeholder="education_level"
                                    {...register("education_level", {})}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="institution"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Institution
                                </label>
                                <input
                                    className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    placeholder="institution"
                                    {...register("institution", {})}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isUpdating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProfileForm;
