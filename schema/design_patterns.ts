// In memry database

import { type } from "os"

interface BaseRecord {
  id: string
}

interface Service extends BaseRecord {
  name: string
  category?: string
}

interface Database<T extends BaseRecord> {
  set: (newValue: T) => void
  get: (id: string) => T | undefined
}

export class InMemoryDataBase<T extends BaseRecord> implements Database<T> {
  private db: Record<string, T> = {}

  public set(newValue: T): void {
    this.db[newValue.id] = newValue;
  }

  public get(id: string) : T | undefined {
    return this.db[id]
  }
}

const a = new InMemoryDataBase<Service>()
a.set({ name: 'wipip', id: '1', category: 'malas' })
a.set({ name: 'chichos', id: 's', category: 'pulguis' })
a.get('1')

// Fectory pattern
function createDatabase<T extends BaseRecord> () {
  class InMemoryDataBase implements Database<T> {
    private db: Record<string, T> = {}

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string) : T | undefined {
      return this.db[id]
    }
  }

  return InMemoryDataBase
}

const ServiceDb = createDatabase<Service>()
const serviceDb = new ServiceDb()
serviceDb.set({ name: 'wipip', id: '1', category: 'malas' })
serviceDb.set({ name: 'chichos', id: 's', category: 'pulguis' })
a.get('1')

// Singleton pattern
function createSingletonDatabase<T extends BaseRecord> () {
  class InMemoryDataBase implements Database<T> {
    private db: Record<string, T> = {}

    private constructor() {}

    static instance: InMemoryDataBase = new InMemoryDataBase() 

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string) : T | undefined {
      return this.db[id]
    }
  }

  return InMemoryDataBase
}

const ServiceDbSingleton = createSingletonDatabase<Service>()
ServiceDbSingleton.instance.set({ name: 'wipip', id: '1', category: 'malas' })
ServiceDbSingleton.instance.get('1')

// Observer pattern
type Listener<EventType> = (ev: EventType) => void

function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void,
  publish: (event: EventType) => void
} {
  let listeners: Listener<EventType>[] = []

  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener)

      return () => {
        listeners.filter((l) => l !== listener)
      }
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event))
    }
  }
}

function createDB (connString: string, message?: string): string
function createDB (config: Record<string, unknown>, status: number): string
function createDB (x: string | Record<string, unknown>, y?: number | string): string {
  if (typeof x === 'string') {
    return 'wipip'
  }

  return 'chichos'
}

const db = createDB('wipip', 'malillas')