import test from "ava";
import { AggregatedMap } from "../src/aggregated-map.mjs";

test("map basics", t => {
  const m1 = new Map([["m1k1", 1]]);
  const m2 = new Map([["m2k1", 2]]);

  const am = new AggregatedMap([m1, m2]);

  t.is(am.size, 2);

  t.deepEqual(
    [...am.entries()],
    [
      ["m1k1", 1],
      ["m2k1", 2]
    ]
  );

  t.deepEqual([...am.keys()], ["m1k1", "m2k1"]);
  t.deepEqual([...am.values()], [1, 2]);

  am.set("mak1", 3);

  t.deepEqual([...am.values()], [1, 3, 2]);
});
