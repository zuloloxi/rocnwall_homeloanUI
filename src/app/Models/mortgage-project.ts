import { Borrower } from './borrower';
import { Simulation } from './simulation';

interface ProjectOptions {
    id?: string;
    referenceId: string;
    projectType: string;
    householdCharges?: number;
    maxLoanPayment?: number;
    borrowers?: Borrower[];
    simulations?: Simulation[];
}

export class Project {
    id: string;
    referenceId: string;
    projectType: string;
    householdCharges: number;
    maxLoanPayment: number;
    borrowers: Borrower[];
    simulations: Simulation[];


    constructor(options: ProjectOptions) {
        this.id = options.id || '';
        this.referenceId = options.referenceId;
        this.projectType = options.projectType;
        this.householdCharges = options.householdCharges || 0;
        this.maxLoanPayment = options.maxLoanPayment || 0;
        this.borrowers = options.borrowers || [];
        this.simulations = options.simulations || [];
    }
}
