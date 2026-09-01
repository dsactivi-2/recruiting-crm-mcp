/**
 * Stateless CRM MCP on Cloudflare Workers.
 * Auth: Authorization Bearer MCP_READ_KEY or MCP_WRITE_KEY
 * Tools call crm_api.* via Supabase REST rpc.
 */

type Env = {
  SUPABASE_URL: string;
  SUPABASE_SECRET: string;
  MCP_READ_KEY: string;
  MCP_WRITE_KEY: string;
};

const READ = new Set([
  "count_candidates",
  "search_candidates",
  "get_candidate",
  "list_occupations",
  "list_candidate_jobs",
  "list_occupation_review_queue",
  "search_candidates_by_occupation",
  "remap_job_occupation",
  "unmap_job_occupation",
]);
const WRITE = new Set([]);

function unauthorized(): Response {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: {
      "content-type": "application/json",
      "www-authenticate": "Bearer",
    },
  });
}

function scopeOf(env: Env, header: string | null): "read" | "write" | null {
  if (!header || !header.toLowerCase().startsWith("bearer ")) return null;
  const token = header.slice(7).trim();
  if (env.MCP_WRITE_KEY && token === env.MCP_WRITE_KEY) return "write";
  if (env.MCP_READ_KEY && token === env.MCP_READ_KEY) return "read";
  return null;
}

async function rpc(env: Env, name: string, args: Record<string, unknown>) {
  const url = `${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/${name}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SECRET,
      authorization: `Bearer ${env.SUPABASE_SECRET}`,
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${name} ${res.status}: ${text.slice(0, 800)}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const tools = [
  {
    name: "count_candidates",
    description: "Anzahl Bewerber zu Filtern. Erst zählen, dann suchen.",
    inputSchema: {
      type: "object",
      properties: {
        filters: { type: "array", items: { type: "object" } },
        query: { type: "string" },
      },
    },
  },
  {
    name: "search_candidates",
    description: "Bewerberliste. Filter-JSON wie Skill filters.md.",
    inputSchema: {
      type: "object",
      properties: {
        filters: { type: "array", items: { type: "object" } },
        query: { type: "string" },
        limit: { type: "number" },
        cursor: { type: "number" },
      },
    },
  },
  {
    name: "get_candidate",
    description: "Ein Profil ohne JMBG/Passwort/Ausweis.",
    inputSchema: {
      type: "object",
      required: ["candidate_id"],
      properties: { candidate_id: { type: "number" } },
    },
  },
  {
    name: "list_occupations",
    description: "Berufskatalog, Slug suchen.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" }, limit: { type: "number" } },
    },
  },
  {
    name: "list_candidate_jobs",
    description: "Jobzeilen inkl. kri_id vor Remap.",
    inputSchema: {
      type: "object",
      required: ["candidate_id"],
      properties: { candidate_id: { type: "number" } },
    },
  },
  {
    name: "list_occupation_review_queue",
    description: "Unklare Jobtitel.",
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" } },
    },
  },
  {
    name: "search_candidates_by_occupation",
    description: "Bewerber zu Slug, optional Mindestjahre.",
    inputSchema: {
      type: "object",
      required: ["occupation_slug"],
      properties: {
        occupation_slug: { type: "string" },
        min_years: { type: "number" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "remap_job_occupation",
    description:
      "Jobzeile einem Beruf zuordnen. Pflicht: kri_id. Ziel: occupation_slug ODER occupation_id ODER new_label_bs.",
    inputSchema: {
      type: "object",
      required: ["kri_id"],
      properties: {
        kri_id: { type: "number" },
        occupation_slug: { type: "string" },
        occupation_id: { type: "number" },
        new_label_bs: { type: "string" },
        new_label_de: { type: "string" },
        add_alias: { type: "boolean" },
      },
    },
  },
  {
    name: "unmap_job_occupation",
    description:
      "Mapping einer Jobzeile löschen (zurück in die Review-Queue). Pflicht: kri_id. Optional remove_alias.",
    inputSchema: {
      type: "object",
      required: ["kri_id"],
      properties: {
        kri_id: { type: "number" },
        remove_alias: { type: "boolean" },
      },
    },
  },
];

async function callTool(env: Env, name: string, args: Record<string, unknown>) {
  switch (name) {
    case "count_candidates":
      return rpc(env, "count_candidates_filtered", {
        p_filters: args.filters ?? [],
        p_query: args.query ?? null,
      });
    case "search_candidates":
      return rpc(env, "search_candidates_filtered", {
        p_filters: args.filters ?? [],
        p_query: args.query ?? null,
        p_limit: args.limit ?? 20,
        p_cursor: args.cursor ?? null,
      });
    case "get_candidate":
      return rpc(env, "get_candidate", { p_candidate_id: args.candidate_id });
    case "list_occupations":
      return rpc(env, "list_occupations", {
        p_query: args.query ?? null,
        p_limit: args.limit ?? 20,
      });
    case "list_candidate_jobs":
      return rpc(env, "list_candidate_jobs", { p_candidate_id: args.candidate_id });
    case "list_occupation_review_queue":
      return rpc(env, "list_occupation_review_queue", { p_limit: args.limit ?? 20 });
    case "search_candidates_by_occupation":
      return rpc(env, "search_candidates_by_occupation", {
        p_occupation_slug: args.occupation_slug,
        p_min_years: args.min_years ?? null,
        p_limit: args.limit ?? 20,
      });
    case "remap_job_occupation":
      return rpc(env, "remap_job_occupation", {
        p_kri_id: args.kri_id,
        p_occupation_id: args.occupation_id ?? null,
        p_occupation_slug: args.occupation_slug ?? null,
        p_new_label_bs: args.new_label_bs ?? null,
        p_new_label_de: args.new_label_de ?? null,
        p_add_alias: args.add_alias ?? true,
      });
    case "unmap_job_occupation":
      return rpc(env, "unmap_job_occupation", {
        p_kri_id: args.kri_id,
        p_remove_alias: args.remove_alias ?? false,
      });
    default:
      throw new Error(`unknown tool ${name}`);
  }
}

function mcpResult(id: unknown, result: unknown) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, result }), {
    headers: { "content-type": "application/json" },
  });
}

function mcpError(id: unknown, message: string, code = -32000) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "GET" && new URL(request.url).pathname === "/") {
      return new Response("recruiting-crm-mcp. POST /mcp with Bearer token.", {
        headers: { "content-type": "text/plain" },
      });
    }
    if (new URL(request.url).pathname !== "/mcp") {
      return new Response("not found", { status: 404 });
    }
    const scope = scopeOf(env, request.headers.get("authorization"));
    if (!scope) return unauthorized();
    if (request.method !== "POST") return new Response("method not allowed", { status: 405 });

    const body = (await request.json()) as {
      id?: unknown;
      method?: string;
      params?: { name?: string; arguments?: Record<string, unknown> };
    };
    const id = body.id ?? 1;
    if (body.method === "initialize") {
      return mcpResult(id, {
        protocolVersion: "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "recruiting-crm-mcp", version: "1.2.0" },
      });
    }
    if (body.method === "tools/list" || body.method === "notifications/initialized") {
      if (body.method === "notifications/initialized") return new Response(null, { status: 202 });
      const visible = tools.filter((t) => READ.has(t.name) || (scope === "write" && WRITE.has(t.name)));
      return mcpResult(id, { tools: visible });
    }
    if (body.method === "tools/call") {
      const name = body.params?.name || "";
      if (WRITE.has(name) && scope !== "write") return mcpError(id, "write key required");
      if (!READ.has(name) && !WRITE.has(name)) return mcpError(id, "unknown tool");
      try {
        const data = await callTool(env, name, body.params?.arguments || {});
        return mcpResult(id, { content: [{ type: "text", text: JSON.stringify(data) }] });
      } catch (e) {
        return mcpError(id, e instanceof Error ? e.message : String(e));
      }
    }
    return mcpError(id, `unsupported method ${body.method}`, -32601);
  },
};
