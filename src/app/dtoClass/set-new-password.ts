export class SetNewPassword {

    private customerId: number
    private loginPassword: string
    private transactionPassword: string

    constructor(customerId: number, loginPassword: string, transactionPassword: string) {
        this.customerId = customerId
        this.loginPassword = loginPassword
        this.transactionPassword = transactionPassword
    }
}
