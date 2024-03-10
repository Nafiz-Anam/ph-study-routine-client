import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
} from "react-icons/tb";
import Link from "next/link";

export default function Home() {
    return (
        <section className="flex flex-col min-h-screen overflow-hidden">
            {/* Hero Section */}
            <div className="text-center py-24 bg-indigo-600 text-white">
                <h1 className="text-5xl font-bold">
                    Master Your Study Routine
                </h1>
                <p className="mt-4 mb-8 text-xl">
                    Plan, prioritize, and achieve your academic goals with ease.
                </p>
                <Link
                    href="/signup"
                    className="px-6 py-2 bg-white text-indigo-600 rounded-md font-semibold shadow"
                >
                    Get Started for Free
                </Link>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div className="flex flex-col items-center">
                        <div className="p-6 rounded-full bg-indigo-100 text-5xl">
                            <TbHexagonNumber1 />
                        </div>
                        <h2 className="mt-4 font-bold text-lg">
                            Smart Scheduling
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Automatically generate study plans around your
                            classes and part-time job.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="p-6 rounded-full bg-indigo-100 text-5xl">
                            <TbHexagonNumber2 />
                        </div>
                        <h2 className="mt-4 font-bold text-lg">
                            Task Prioritization
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Focus on what matters most with priority-based task
                            sorting.
                        </p>
                    </div>

                    <div className="flex flex-col items-center ">
                        <div className="p-6 rounded-full bg-indigo-100 text-5xl">
                            <TbHexagonNumber3 />
                        </div>
                        <h2 className="mt-4 font-bold text-lg">
                            Progress Tracking
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Monitor your study progress and stay motivated every
                            step of the way.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-indigo-600 text-white text-center py-24">
                <h2 className="text-3xl font-bold">
                    Join Our Community of Achievers
                </h2>
                <p className="mt-4 mb-6 max-w-xl mx-auto">
                    Sign up now to start optimizing your study routine and take
                    the first step towards academic success.
                </p>
                <Link
                    href="/signup"
                    className="px-6 py-2 border border-white rounded-md font-semibold shadow-lg"
                >
                    Sign Up Now
                </Link>
            </div>
        </section>
    );
}
