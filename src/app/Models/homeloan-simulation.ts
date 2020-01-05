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

export class HomeloanSimulation {

    constructor(
        public simulationDate: Date,
        public personalDeposit: number,
        public loanAmount: number,
        public loanPayment: number,
        public loanInterestRate: number,
        public loanInsuranceRate: number,
        public loanGuarantyRate: number,
        public loanDuration: number,
        public periodicity: Periodicity,
        public globalLoanPayment: number,
        public loanCost: number,
        public interestCost: number,
        public loanInsuranceCost: number,
        public applicationFee: number,
        public loanGuaranty: number,
        public effectiveInterestRate: number,
        public insuranceImpactOnInterestRate: number,
        public feesImpactOnInterestRate: number,
        public creditRequest: boolean
    ) { }
}
