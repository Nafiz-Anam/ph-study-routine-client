import {
    FaUser,
    FaBook,
    FaHistory,
    FaHome,
    FaLocationArrow,
    FaLock,
} from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";

export const MenuItems = [
    {
        key: "1",
        icon: <FaUser />,
        label: "Profile",
        href: "/profile",
    },
    {
        key: "2",
        icon: <FaBook />,
        label: "Education",
        href: "/profile/education",
    },
    {
        key: "3",
        icon: <PiCertificate />,
        label: "Certificate",
        href: "/profile/certificate",
    },
    {
        key: "4",
        icon: <FaHistory />,
        label: "Job History",
        href: "/profile/job-history",
    },
    {
        key: "5",
        icon: <FaLocationArrow />,
        label: "Present Address",
        href: "/profile/present-address",
    },
    {
        key: "6",
        icon: <FaHome />,
        label: "Permanent Address",
        href: "/profile/permanent-address",
    },

    {
        key: "7",
        icon: <FaLock />,
        label: "Update Password",
        href: "/profile/update-password",
    },
    {
        key: "8",
        icon: <MdOutlineSettings />,
        label: "Settings",
        href: "/profile/settings",
    },
];
