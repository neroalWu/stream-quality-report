import { MongoClient, type Db, type InsertOneResult, Collection } from 'mongodb'

export default class StreamQualityService {
    private readonly uri: string
    private client: MongoClient | null = null
    private db: Db | null = null

    constructor(uri: string) {
        this.uri = uri
    }

    public async Connect(databaseName: string): Promise<void> {
        try {
            this.client = new MongoClient(this.uri)
            await this.client.connect()
            this.db = this.client.db(databaseName)
            console.log('Connected to MongoDB')
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
        }
    }

    public async Disconnect(): Promise<void> {
        try {
            if (this.client) {
                await this.client.close()
                console.log('Disconnected from MongoDB')
            }
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
        }
    }

    public async InsertData(collectionName: string, data: Document): Promise<InsertOneResult> {
        try {
            const collection: Collection = this.db!.collection(collectionName)
            const result: InsertOneResult = await collection.insertOne(data)
            return result
        } catch (error) {
            console.error('Error inserting data into MongoDB:', error)
            throw error
        }
    }

    public async GetData<T>(collectionName: string, query: any = {}): Promise<any> {
        try {
            const collection: Collection = this.db!.collection(collectionName);
            return await collection.find(query).toArray();
        } catch (error) {
            console.error('Error getting data from MongoDB:', error);
            throw error;
        }
    }
}
