export interface Bank {
    id: number;
    name: string;
    code: string;
    bin: string;
    shortName: string;
    short_name: string;
    logo: string;
    transferSupported: number;
    lookupSupported: number;
    support: number;
    isTransfer: number;
    swift_code: string;
}

export interface BankListResponse {
    code: string;
    desc: string;
    data: Bank[];
}