const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a
                            href="#"
                            className="text-2xl font-bold  rounded-ss-3xl rounded-br-3xl bg-white py-2 px-3 text-gray-800"
                        >
                            Study Planner
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Product
                            </h2>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Demo
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Company
                            </h2>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Careers
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Support
                            </h2>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Legal
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Follow Us
                            </h2>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-indigo-400"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm mt-12 md:mt-16">
                    &copy; {new Date().getFullYear()} Study Planner. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
