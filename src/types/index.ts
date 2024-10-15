export interface Employee {
    name: string;
    avatar?: string;
    title?: string;
    exp?: string;
    type?: string;
    emplType?: string;
    yearOfJoining?: string;
    emplID?: string;
    account?: Account[];
    reporties?: Employee[];
}

export interface Reporty {
    name: string;
    "Emp-ID"?: string;
    avatar?: string;
    type?: string;
    title?: string;
    exp?: string;
    reporties?: Reporty[];
    account?: Account[];
}

export interface Account {
    name: string;
    product: Product;
}

export interface Product {
    name: string;
}

export interface Profile {
    Name: string;
    Designation: string;
    "Laptop-Asset-id-SN-Type)": string;
    Location: string;
    "Emp-ID": string;
    networkID: string;
    Email: string;
    DOJ: number;
    "RAK-Exp": number;
    Consultance: string;
    "Functional-Platform-Knowledge": string;
    "Primary-Skill": string;
    "Secondary-Skills": string;
    PAR: string;
    "Functional-Knowledge": string;
    "Contract-End-date": number;
    WOR: string;
    "Total Epx": number;
    "Sal-2023-24": string;
    "Rating-2023": string;
    "Sal-2024": string;
    "Performance-feedback": string;
    "Q1-Project": string;
    "Q2-Project": string;
    April: string;
    May: string;
    June: string;
    July: string;
    Aug: string;
    Sept: string;
    Oct: string;
    Nov: string;
    Dec: string;
    Q3: string;
    LM: string;
    Squad: string;
}
