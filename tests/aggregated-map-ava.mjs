import test from "ava";
import { AggregatedMap } from "aggregated-map";

test("map basics", t => {
  const m1 = new Map([["m1k1", 1]]);
  const m2 = new Map([["m2k1", 2]]);
  const am = new AggregatedMap([m1, m2]);

  t.is(am.size, 2);
  t.is(`${am}`, "[object Map]");

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

  t.deepEqual(
    [...am],
    [
      ["m1k1", 1],
      ["mak1", 3],
      ["m2k1", 2]
    ]
  );

  t.is(am.delete("m2k1"), true);
  t.is(am.delete("m2k1"), false);

  t.deepEqual([...am.values()], [1, 3]);

  t.is(am.getOrInsert("mak1", "3x"), 3);
  t.is(
    am.getOrInsertComputed("mak1", key => "3x"),
    3
  );

  t.is(am.getOrInsert("x1", "x1v"), "x1v");
  t.is(
    am.getOrInsertComputed("x2", key => "x2v"),
    "x2v"
  );
});

test("Array.from", t => {
  const m1 = new Map([["m1k1", 1]]);
  const m2 = new Map([["m2k1", 2]]);
  const am = new AggregatedMap([m1, m2]);

  t.deepEqual(Array.from(am), [
    ["m1k1", 1],
    ["m2k1", 2]
  ]);
});
