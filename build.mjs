import { mkdir, cp, readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

await mkdir("dist", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await cp("index.html", "dist/index.html", { force: true });
await cp("wedding-invitation", "dist/wedding-invitation", {
  recursive: true,
  force: true
});
await cp(".openai/hosting.json", "dist/.openai/hosting.json", { force: true });

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png"
};

const files = [
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/wedding-invitation/", "wedding-invitation/index.html"],
  ["/wedding-invitation/index.html", "wedding-invitation/index.html"],
  ["/wedding-invitation/style.css", "wedding-invitation/style.css"],
  ["/wedding-invitation/script.js", "wedding-invitation/script.js"],
  [
    "/wedding-invitation/assets/images/wedding-couple.png",
    "wedding-invitation/assets/images/wedding-couple.png"
  ]
];

const manifest = Object.fromEntries(
  await Promise.all(
    files.map(async ([route, filePath]) => {
      const data = await readFile(filePath);
      const type = contentTypes[extname(filePath)] || "application/octet-stream";
      return [route, { type, body: data.toString("base64") }];
    })
  )
);

const worker = `const files = ${JSON.stringify(manifest)};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/wedding-invitation") {
      return Response.redirect(new URL("/wedding-invitation/", url), 302);
    }

    const file = files[url.pathname] || files["/"];

    return new Response(decodeBase64(file.body), {
      headers: {
        "content-type": file.type,
        "cache-control": file.type.startsWith("image/")
          ? "public, max-age=31536000, immutable"
          : "public, max-age=300"
      }
    });
  }
};
`;

await writeFile("dist/server/index.js", worker);
