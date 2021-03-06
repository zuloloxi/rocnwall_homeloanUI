interface SimulationOptions {
    id?: string;
    simulationDate?: Date;
    personalDeposit: number;
    loanAmount: number;
    globalLoanPayment: number;
    loanInterestRate: number;
    loanInsuranceRate: number;
    loanGuarantyRate: number;
    loanDuration: number;
    periodicity: Periodicity;
    loanPayment?: number;
    loanCost?: number;
    interestCost?: number;
    insuranceCost?: number;
    applicationFee?: number;
    loanGuaranty?: number;
    effectiveInterestRate?: number;
    insuranceImpactOnInterestRate?: number;
    feesImpactOnInterestRate?: number;
    creditRequest?: boolean;
}

export enum CalculationMode {
    CAPITAL_TARGET,
    PAYMENT_TARGET
}

export enum Periodicity {
    Mensuelle,
    Trimestrielle,
    Semestrielle,
    Annuelle
}

export class Simulation {
    id: string;
    simulationDate: Date;
    personalDeposit: number;
    loanAmount: number;
    globalLoanPayment: number;
    loanInterestRate: number;
    loanInsuranceRate: number;
    loanGuarantyRate: number;
    loanDuration: number;
    periodicity: Periodicity;
    loanPayment: number;
    loanCost: number;
    interestCost: number;
    insuranceCost: number;
    applicationFee: number;
    loanGuaranty: number;
    effectiveInterestRate: number;
    insuranceImpactOnInterestRate: number;
    feesImpactOnInterestRate: number;
    creditRequest: boolean;

    constructor(options: SimulationOptions) {
        this.id = options.id;
        this.simulationDate = options.simulationDate;
        this.personalDeposit = options.personalDeposit;
        this.loanAmount = options.loanAmount;
        this.globalLoanPayment = options.globalLoanPayment;
        this.loanInterestRate = options.loanInterestRate;
        this.loanInsuranceRate = options.loanInsuranceRate;
        this.loanGuarantyRate = options.loanGuarantyRate;
        this.loanDuration = options.loanDuration;
        this.periodicity = options.periodicity;
        this.loanPayment = options.loanPayment || 0;
        this.loanCost = options.loanCost || 0;
        this.interestCost = options.interestCost || 0;
        this.insuranceCost = options.insuranceCost || 0;
        this.applicationFee = options.applicationFee || 0;
        this.loanGuaranty = options.loanGuaranty || 0;
        this.effectiveInterestRate = options.effectiveInterestRate || 0;
        this.insuranceImpactOnInterestRate = options.insuranceImpactOnInterestRate || 0;
        this.feesImpactOnInterestRate = options.feesImpactOnInterestRate || 0;
        this.creditRequest = options.creditRequest || false;
    }
}
