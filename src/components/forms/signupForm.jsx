"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setCredentials } from "@/redux/features/authSlice";
import { useRegisterUserMutation } from "@/redux/services/authApi";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log("errors =>", errors);

    const [registerUser] = useRegisterUserMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            await registerUser(data)
                .unwrap()
                .then((result) => {
                    dispatch(setCredentials(result?.data));
                    toast.success("User signed up Successfully");
                    router.push("/");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                })
                .catch((error) => {
                    toast.error(error?.data?.message || "Failed to sign up.");
                    // console.error("Failed to sign up.", error);
                });
        } catch (err) {
            // console.error("Error registering the user: ", err);
            toast.error("Failed to sign up.");
        }
    };

    return (
        <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="email"
                                placeholder="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.type === "required"
                                        ? "Email is required."
                                        : "Insert a valid email address."}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="password"
                                placeholder="password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.type === "required"
                                        ? "Password is required."
                                        : "Password must be greater than 6 char. & max 16 char"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in now
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterForm;
