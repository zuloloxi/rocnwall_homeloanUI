interface SimulationOptions {
    simulationDate: Date;
    personalDeposit: number;
    loanAmount: number;
    loanPayment: number;
    loanInterestRate: number;
    loanInsuranceRate: number;
    loanGuarantyRate: number;
    loanDuration: number;
    periodicity: Periodicity;
    globalLoanPayment?: number;
    loanCost?: number;
    interestCost?: number;
    loanInsuranceCost?: number;
    applicationFee?: number;
    loanGuaranty?: number;
    effectiveInterestRate?: number;
    insuranceImpactOnInterestRate?: number;
    feesImpactOnInterestRate?: number;
    creditRequest?: boolean;
}

export enum CalculationMode {
    CAPITAL_CIBLE,
    ECHEANCE_CIBLE
}

export enum Periodicity {
    MENSUELLE,
    TRIMESTRIELLE,
    SEMESTRIELLE,
    ANNUELLE
}

export class Simulation {
    simulationDate: Date;
    personalDeposit: number;
    loanAmount: number;
    loanPayment: number;
    loanInterestRate: number;
    loanInsuranceRate: number;
    loanGuarantyRate: number;
    loanDuration: number;
    periodicity: Periodicity;
    globalLoanPayment: number;
    loanCost: number;
    interestCost: number;
    loanInsuranceCost: number;
    applicationFee: number;
    loanGuaranty: number;
    effectiveInterestRate: number;
    insuranceImpactOnInterestRate: number;
    feesImpactOnInterestRate: number;
    creditRequest: boolean;

    constructor(options: SimulationOptions) {
        this.simulationDate = options.simulationDate;
        this.personalDeposit = options.personalDeposit;
        this.loanAmount = options.loanAmount;
        this.loanPayment = options.loanPayment;
        this.loanInterestRate = options.loanInterestRate;
        this.loanInsuranceRate = options.loanInsuranceRate;
        this.loanGuarantyRate = options.loanGuarantyRate;
        this.loanDuration = options.loanDuration;
        this.periodicity = options.periodicity;
        this.globalLoanPayment = options.globalLoanPayment || 0;
        this.loanCost = options.loanCost || 0;
        this.interestCost = options.interestCost || 0;
        this.loanInsuranceCost = options.loanInsuranceCost || 0;
        this.applicationFee = options.applicationFee || 0;
        this.loanGuaranty = options.loanGuaranty || 0;
        this.effectiveInterestRate = options.effectiveInterestRate || 0;
        this.insuranceImpactOnInterestRate = options.insuranceImpactOnInterestRate || 0;
        this.feesImpactOnInterestRate = options.feesImpactOnInterestRate || 0;
        this.creditRequest = options.creditRequest || false;
    }
}
