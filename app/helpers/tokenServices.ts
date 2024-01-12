
class TokenServices{
    extractToken(authToken:string){
        return authToken.split(' ')[1]
    }
}
export default new TokenServices()