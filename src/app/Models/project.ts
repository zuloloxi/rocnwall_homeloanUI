interface ProjectOptions {
    id?: string;
    referenceId?: string;
    householdCharges?: number;
    maxLoanPayment?: number;
}

export class Project {
    id: string;
    referenceId: string;
    householdCharges: number;
    maxLoanPayment: number;

    constructor(options: ProjectOptions) {
        this.id = options.id || '';
        this.referenceId = options.referenceId || '';
        this.householdCharges = options.householdCharges || 0;
        this.maxLoanPayment = options.householdCharges || 0;
    }
}
