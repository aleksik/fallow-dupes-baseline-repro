# fallow dupes baseline repro

Minimal repro for [fallow-rs/fallow#3290](https://github.com/fallow-rs/fallow/issues/3290): with fallow 3.32.0, `fallow dupes --baseline` hides a new clone group and reports an untouched one.

Six files hold three unrelated clone pairs (same shape, different constants). `main` has a baseline saved from them. The `add-clone` branch adds one more unrelated pair, `g.ts`/`h.ts`.

Needs Node 22+ and `jq`.

```bash
npm ci

npm run report      # three groups, all fingerprinted dup:c77b3abb6f87acd9-rN
npm run gate        # exit 0: matches the baseline

git checkout add-clone
npm run report      # four groups; c.ts/d.ts moved from -r3 to -r4, g.ts/h.ts took -r2
npm run gate:show   # expected: g.ts/h.ts   actual: c.ts/d.ts
npm run gate        # exit 1, but for the wrong group
```

Output on `add-clone`:

```
$ npm run -s report
dup:c77b3abb6f87acd9-r1  a.ts:2-20 b.ts:2-20
dup:c77b3abb6f87acd9-r4  c.ts:2-20 d.ts:2-20
dup:c77b3abb6f87acd9-r3  e.ts:2-20 f.ts:2-20
dup:c77b3abb6f87acd9-r2  g.ts:2-20 h.ts:2-20

$ npm run -s gate:show
dup:6f87acd9  c.ts:2-20 d.ts:2-20
```

`c77b3abb6f87acd9` is `xxh3_64` of an empty token sequence: each fragment (lines 2-20, cut before the function's closing `}`) re-tokenizes to nothing, so all groups share one hash and `-rN` is just a position ordinal that the baseline keys on.
