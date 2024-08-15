import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client()
    account;

    constructor(){      // Make a constructor so that we dont waste resources by calling account in class
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId)

        this.account = new Account(this.client)
    }
    // make a method to create an user.. it will be a async function as create and storing in DB will take time
    async create({email, name, password}){    
        try {            
            const newUser = await this.account.create(ID.unique(), email, password, name)

            if(newUser){    // if newUser is create then also log in them using login method
                return this.login({email,password})
            }
            else{
                return newUser || null
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)            
        } catch (error) {
            console.log("Error at logging user", error);
            return false
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log("Error at logout user", error);
        }
        return null             // if the account doesnt exist toh return null
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Error at getting current user", error);
        }
        return null
    }
}

const authService = new AuthService()

export default authService