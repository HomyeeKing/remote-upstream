import { test, assert } from "vitest"
import { foo } from "../src/index.mjs"

test("simple", () => {
  assert.equal(foo, "foo")
})
