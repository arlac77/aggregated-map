/**
 * Dynamic aggregation of several Maps
 */
export class AggregatedMap {
  /**
   *
   * @param {Map<any,any>[]} sources
   */
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

  get [Symbol.toStringTag]() {
    return this.sources[0][Symbol.toStringTag];
  }

  forEach(callbackfn, thisArg) {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  clear() {
    for (const source of this.sources) {
      source.clear();
    }
  }

  delete(key) {
    for (const source of this.sources) {
      source.delete(key);
    }
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
