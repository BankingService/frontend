export class ProfilePassword {
    private customerId: number
    private profilePassword: string
    constructor(customerId: number, profilePassword: string) {
        this.customerId = customerId
        this.profilePassword = profilePassword
    }
}
