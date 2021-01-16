export class ProfilePassword {
    private customerId: number
    private loginPassword: string
    constructor(customerId: number, loginPassword: string) {
        this.customerId = customerId
        this.loginPassword = loginPassword
    }
}
