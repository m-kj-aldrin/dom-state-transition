// Define a helper type that sets up the structure
type NestedObject<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    [x: string]: {
      // This makes `field` be the union of all keys in T
      field: keyof T;
    };
  };
};

// Now define the root object with a specific set of keys:
type MyParents = {
  parentA: unknown;
  parentB: unknown;
  parentC: unknown;
};

// Create a type where each parent's `child.field` is a union of the keys of MyParents.
type Root = NestedObject<MyParents>;

const root: Root = {
  parentA: { child: { field: "parentB" } },
  parentB: { child: { field: "parentA" } },
  parentC: { bla: { field: "parentA" } },
};
