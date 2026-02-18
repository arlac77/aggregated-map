/**
 * Dynamic aggregation of several Maps
 */
export class AggregatedMap {
  constructor(sources) {
    this.sources = sources;
  }

  set(key, value) {
    this.sources[0].set(key, value);
    return this;
  }

  *keys() {
    for (const source of this.sources) {
      yield* source.keys();
    }
  }

  *values() {
    for (const source of this.sources) {
      yield* source.values();
    }
  }

  *entries() {
    for (const source of this.sources) {
      yield* source.entries();
    }
  }

  *[Symbol.iterator]() {
    for (const source of this.sources) {
      yield* source;
    }
  }

  forEach(callbackfn, thisArg) {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  clear(key) {
    this.sources[0].clear();
  }

  delete(key) {
    return this.sources[0].delete(key);
  }

  has(key) {
    for (const source of this.sources) {
      if (source.has(key)) {
        return true;
      }
    }

    return false;
  }

  get(key) {
    for (const source of this.sources) {
      const value = source.get(key);
      if (value !== undefined) {
        return value;
      }
    }
  }

  get size() {
    return this.sources.reduce((a, c) => a + c.size, 0);
  }
}
