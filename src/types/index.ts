export interface Member {
    id: string;
    name: string;
    createdAt: number;
}

export interface PaymentData {
    date: string;
    name: string;
}

export interface ReportRow {
    id: string;
    key: string;
    name: string;
    isPaid: boolean;
    date: string | null;
    isExMember: boolean;
}
