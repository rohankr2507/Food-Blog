import { Client, Databases } from "appwrite"
import conf from "../conf/conf";

const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

const database = new Databases(client);

export { client, database };