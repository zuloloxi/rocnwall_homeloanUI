interface BorrowerOptions {
    netIncome?: number;
    dateOfBirth?: Date;
}

export class Borrower {
    netIncome: number;
    dateOfBirth: Date;

    constructor(options : BorrowerOptions) {
        this.netIncome = options.netIncome || 0;
        this.dateOfBirth = options.dateOfBirth;
    }

}
