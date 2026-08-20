import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import * as path from 'path'

interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

interface CacheData<T> {
    entries: Record<string, CacheEntry<T>>;
}

export class SharedCache<T> {
    private _db: Low<CacheData<T>>
    private _fallback = false
    private _mem = new Map<string, CacheEntry<T>>()

    constructor(storageDir: string, namespace: string, private readonly _ttlMs: number) {
        const file = path.join(storageDir, `${namespace}.json`)
        this._db = new Low(new JSONFile<CacheData<T>>(file), { entries: {} })
    }

    async init(): Promise<void> {
        try {
            await this._db.read()
        } catch {
            this._fallback = true
        }
    }

    get(key: string): T | undefined {
        if (this._fallback) {
            const entry = this._mem.get(key)
            if (entry && entry.expiresAt > Date.now()) {
                return entry.value
            }
            if (entry) {
                this._mem.delete(key)
            }
            return undefined
        }
        const entry = this._db.data.entries[key]
        if (entry && entry.expiresAt > Date.now()) {
            return entry.value
        }
        if (entry) {
            delete this._db.data.entries[key]
        }
        return undefined
    }

    set(key: string, value: T): void {
        const entry: CacheEntry<T> = { value, expiresAt: Date.now() + this._ttlMs }
        if (this._fallback) {
            this._mem.set(key, entry)
            return
        }
        this._db.data.entries[key] = entry
        // ponytail: fire-and-forget; lowdb coalesces concurrent writes
        void this._db.write()
    }

    async clear(): Promise<void> {
        if (this._fallback) {
            this._mem.clear()
            return
        }
        this._db.data.entries = {}
        await this._db.write()
    }
}
