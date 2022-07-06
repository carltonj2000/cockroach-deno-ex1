// run via -> deno run --allow-net --allow-read --allow-env hello.ts
import { serve } from "https://deno.land/std@0.147.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

interface Dinosaurs {
  name: string;
  diet: string;
  link: string;
}

const {
  COCKROACH_DB_SQL_CLUSTER: cluster,
  COCKROACH_DB_SQL_USER: usr,
  COCKROACH_DB_SQL_PW: pw,
} = config();

const connection = `postgresql://${usr}:${pw}@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/junior-dove-3369.defaultdb?sslmode=require&options=--cluster%3D${cluster}`;

const client = new Client(connection);
await client.connect();

const result = await client.queryObject<Dinosaurs>(
  "SELECT name, diet, link FROM dinosaurs"
);

const dinosaurs = result.rows;

const port = 8080;

const handler = (request: Request): Response => {
  const firstDino = dinosaurs[0];
  const body =
    `Your user-agent is:\n\n${
      request.headers.get("user-agent") ?? "Unknown"
    } \n\n` + `${firstDino.name}: ${firstDino.diet} ${firstDino.link}`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);

await serve(handler, { port });
