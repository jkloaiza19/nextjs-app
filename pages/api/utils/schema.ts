import { MongoClient } from 'mongodb'
// import client from './database'

export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum DBCollections {
  emails = 'email',
  comments = 'comments',
  events = 'events',
  posts = 'posts',
}

export interface IFeedback {
  email?: string | null
  feedback?: string | null
}

export interface IFeedbackList {
  message?: string
  feedBackIntems: IFeedback[]
}

export interface IRequestOptions {
  method: RequestMethod,
  body?: string,
  headers?: Record<string, string>
}

export interface IRequest {
  url: string,
  options?: IRequestOptions
}

export interface IResponse<T> {
  status: number
  message: string
  data: T
}

export interface IComment {
  eventId: string
  email: string
  name: string
  comment: string
}

export interface IPost {
  id: string
  title: string
  content: string
  image?: string
  author: string
  slug: string
  createdAt: string
  updatedAt: string
  excerpt?: string
  isFeatured: boolean
}

export type MongoClientType = typeof MongoClient

export type Sort = Record<string, string | number>

export type Projection = Record<string, string | number>

export interface IDBConnection<T> {
  connect: () => void
  close: () => void
  insertOne: (data: T) => Promise<T>
  findOne: (query: any, sort?: Sort) => Promise<T>
  retrieveAll: (sort?: Sort) => Promise<T[]>
  retrieveAllWithQuery: (query: any, sort?: Sort) => Promise<T[]>
}

export class DBConnection<T> implements IDBConnection<T> {
  private dbClient: MongoClientType
  private collection: DBCollections
  private defaultSort: Sort = { _id: -1 } // sorts items descending by _id
  private defaultProjection = { _id: 0 } // excludes the _id prop

  public constructor (collection: DBCollections, client: MongoClientType) {
    this.collection = collection
    this.dbClient = client
  }

  public async connect() {
    this.dbClient.connect()
  }

  public async close() {
    this.dbClient.close()
  }

  public async insertOne(data: T): Promise<T> {
    return this.dbClient.db().collection<T>(this.collection).insertOne(data)
  }

  public async findOne(query: any, sort?: Sort, projection?: Projection): Promise<T> {
    return this.dbClient.db().collection<T>(this.collection)
      .findOne(query, {
        sort: sort || this.defaultSort,
        projection: projection || this.defaultProjection,
      })
  }

  public async retrieveAll(sort?: Sort): Promise<T[]> {
    return this.dbClient.db().collection<T>(this.collection)
      .find() // returns all the items for a given collection
      .sort(sort || this.defaultSort)
      .project({ _id: 0 })
      .toArray()
  }

   public async retrieveAllWithQuery(query: any, sort?: Sort, projection?: Projection): Promise<T[]> {
    return this.dbClient.db().collection<T>(this.collection)
      .find(query, {
        sort: sort || this.defaultSort,
        projection: projection || this.defaultProjection,
      }) // returns a filtered list of items for a given collection
      .toArray()
  }
}