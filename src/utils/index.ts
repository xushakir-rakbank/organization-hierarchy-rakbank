import { Profile } from "../types";
import projects from "../data/projects.json";

export const getRandomColor = () => {
    const colors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#3f51b5",
        "#2196f3",
        "#4caf50",
        "#ff9800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

export function loadProfileImage(name: string) {
    return new URL(`../assets/profileImages/${name}.png`, import.meta.url).href;
}

export function getCurrentQuarter(q?: "Q1" | "Q2" | "Q3" | "Q4") {
    const currentDate = new Date();
    const month = currentDate.getMonth();

    let quarter, startMonth, endMonth;

    if ((month >= 0 && month <= 2) || q === "Q1") {
        quarter = "Q1";
        startMonth = "Jan";
        endMonth = "Mar";
    } else if ((month >= 3 && month <= 5) || q === "Q2") {
        quarter = "Q2";
        startMonth = "Apr";
        endMonth = "Jun";
    } else if ((month >= 6 && month <= 8) || q === "Q3") {
        quarter = "Q3";
        startMonth = "Jul";
        endMonth = "Sep";
    } else if ((month >= 9 && month <= 11) || q === "Q4") {
        quarter = "Q4";
        startMonth = "Oct";
        endMonth = "Dec";
    }

    return {
        quarter,
        startMonth,
        endMonth,
    };
}

export function getAllPreviousProjects(user: Profile | null) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const previousProjects = [];
    if (user) {
        if (currentMonth >= 3 && currentMonth <= 5) {
            previousProjects.push({
                project: findProject(user["Q1-Project"]),
                quarter: getCurrentQuarter("Q1"),
            });
        }
        if (currentMonth >= 6 && currentMonth <= 8) {
            previousProjects.push({
                project: findProject(user["Q1-Project"]),
                quarter: getCurrentQuarter("Q1"),
            });
            previousProjects.push({
                project: findProject(user["Q2-Project"]),
                quarter: getCurrentQuarter("Q2"),
            });
        }
        if (currentMonth >= 9 && currentMonth <= 11) {
            previousProjects.push({
                project: findProject(user["Q1-Project"]),
                quarter: getCurrentQuarter("Q1"),
            });
            previousProjects.push({
                project: findProject(user["Q2-Project"]),
                quarter: getCurrentQuarter("Q2"),
            });
            previousProjects.push({
                project: findProject(user["Q3-Project"]),
                quarter: getCurrentQuarter("Q3"),
            });
        }
    }

    return previousProjects.filter((project) => project);
}

function findProject(id: string) {
    return projects.find((p) => p.id === id);
}

export function findUsersByProjectID(projectID: string, obj: any) {
    let users: any = [];

    if (obj.projects && obj.projects.includes(projectID)) {
        users.push(obj);
    }

    if (obj.reporties && Array.isArray(obj.reporties)) {
        obj.reporties.forEach((reportie: any) => {
            users = users.concat(findUsersByProjectID(projectID, reportie));
        });
    }

    return users;
}
