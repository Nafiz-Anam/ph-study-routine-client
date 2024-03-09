import RoutineDisplay from "@/components/routinDisplay";

const Routine = () => {
    const studyPlanSample = {
        studyPlan: {
            unallocatedTasks: [],
            Monday: [
                {
                    name: "math",
                    timeNeeded: 120,
                    priority: "high",
                    _id: "65ec11c3f9f249733af4c6ea",
                    startTime: "06:30",
                    endTime: "08:30",
                },
                {
                    name: "algorithms",
                    timeNeeded: 180,
                    priority: "medium",
                    _id: "65ec11c3f9f249733af4c6eb",
                    startTime: "12:00",
                    endTime: "15:00",
                },
            ],
            Tuesday: [
                {
                    name: "machine learning",
                    timeNeeded: 120,
                    priority: "medium",
                    _id: "65ec11c3f9f249733af4c6ed",
                    startTime: "10:00",
                    endTime: "12:00",
                },
            ],
            Wednesday: [
                {
                    name: "catch-up math",
                    timeNeeded: 120,
                    priority: "medium",
                    _id: "65ec11c3f9f249733af4c6ee",
                    startTime: "06:30",
                    endTime: "08:30",
                },
            ],
            Thursday: [
                {
                    name: "catch-up algorithms",
                    timeNeeded: 120,
                    priority: "medium",
                    _id: "65ec11c3f9f249733af4c6ef",
                    startTime: "10:00",
                    endTime: "12:00",
                },
            ],
            Friday: [
                {
                    name: "catch-up machine learning",
                    timeNeeded: 120,
                    priority: "medium",
                    _id: "65ec11c3f9f249733af4c6f0",
                    startTime: "06:30",
                    endTime: "08:30",
                },
            ],
            Saturday: [
                {
                    name: "english",
                    timeNeeded: 120,
                    priority: "low",
                    _id: "65ec11c3f9f249733af4c6ec",
                    startTime: "07:30",
                    endTime: "09:30",
                },
            ],
            Sunday: [],
        },
    };
    return <RoutineDisplay studyPlan={studyPlanSample.studyPlan} />;
};

export default Routine;
