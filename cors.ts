// this is a cors proxy for the replit gql endpoint which is hosted on
// https://deno.com/deploy. no, this will only work for my specific endpoint,
// no yours. i'm trying to avoid ddosing deno deploy's servers

import { serve } from "https://deno.land/x/sift@0.3.5/mod.ts";

const API_URL = "https://replit.com/graphql";
const HEADERS = new Headers({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Connection": "keep-alive",
  "X-Requested-With": "the ReplAPI.it Project",
  "Referrer": "https://replit.com/",
  "Origin": "https://replit.com/",
});

const ORIGIN = "https://whois.repl.co";

serve({
  "/": async (req) => {
    // if(req.url.toLowerCase() !== ORIGIN) {
    //   return new Response(null, { status: 401 });
    // }

    const api = await fetch(
      API_URL,
      {
        method: "POST",
        headers: HEADERS,
        body: await req.text(),
      }
    );

    // api.headers.set("Access-Control-Allow-Origin", "https://whois.repl.co");
    // api.headers.set("Vary", "Origin");
    // api.headers.set("Access-Control-Allow-Origin", "*");

    return new Response(
      await api.text(),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Origin": "https://whois.repl.co",
          // "Vary": "Origin",
        },
      }
    );
  },
});
