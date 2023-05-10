class TokenServices{
    extractToken(authToken:string){
        return authToken.split(' ')[1]
    }
}

module.exports = new TokenServices()