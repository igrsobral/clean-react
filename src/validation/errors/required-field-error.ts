export class RequiredFieldError extends Error {
    constructor(){
        super('Campo obrigátório')
        this.name = 'RequiredFieldError'
    }
}