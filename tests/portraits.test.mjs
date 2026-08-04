import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("every quiz result uses a portrait committed under public/portraits", async () => {
  const source = await readFile(path.join(process.cwd(), "app", "page.tsx"), "utf8");
  const heroIds = [...source.matchAll(/\{ id:"([a-z]+)", name:/g)].map((match) => match[1]);

  assert.equal(heroIds.length, 12);
  assert.match(source, /src=\{`\/portraits\/\$\{winner\.id\}\.webp`\}/);
  assert.doesNotMatch(source, /(?:chatgpt|chatgpt-team\.site).*portraits/i);

  await Promise.all(
    heroIds.map((id) => access(path.join(process.cwd(), "public", "portraits", `${id}.webp`))),
  );
});
