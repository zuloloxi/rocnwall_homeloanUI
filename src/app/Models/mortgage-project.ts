import { Borrower } from './borrower';

interface ProjectOptions {
    id?: string;
    referenceId: string;
    projectType: string;
    householdCharges?: number;
    maxLoanPayment?: number;
    borrowers?: Borrower[];
}

export class Project {
    id: string;
    referenceId: string;
    projectType: string;
    householdCharges: number;
    maxLoanPayment: number;
    borrowers: Borrower[];


    constructor(options: ProjectOptions) {
        this.id = options.id || '';
        this.referenceId = options.referenceId;
        this.projectType = options.projectType;
        this.householdCharges = options.householdCharges || 0;
        this.maxLoanPayment = options.householdCharges || 0;
        this.borrowers = options.borrowers || [];
    }
}