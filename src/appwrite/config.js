import { Client, Databases, Query, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client()
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        console.log("2");
        
        try {
            console.log("3");
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("APPWRITE :: CONFIG :: Error in createPost", error);
            return false;
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("APPWRITE :: CONFIG :: Error in updatePost", error)
            return false
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("APPWRITE :: CONFIG :: Error in deletePost", error)
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log("APPWRITE :: CONFIG :: Error in getPost", error)
            return false
        }
    }
    async getAllPost(queries = [Query.equal("status",["active"])]){
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log("APPWRITE :: CONFIG :: Error in getAllPost", error)
            return false
        }
    }
    async fileUpload(file){
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
           
            console.log("APPWRITE :: CONFIG :: Error in fileUpload", error)
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("APPWRITE :: CONFIG :: Error in deleteFile", error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
    }

}

const service = new Service()

export default service