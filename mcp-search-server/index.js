import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const server = new Server(
  {
    name: "google-search-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_google",
        description: "Selenium 브라우저로 Google 검색을 수행하고 텍스트 결과를 반환합니다.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "검색어 (한글 지원)",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "search_google") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const query = request.params.arguments?.query;
  if (!query) {
    throw new Error("Query parameter is required");
  }

  const options = new chrome.Options();
  options.addArguments("--headless=new");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--window-size=1920,1080");
  options.addArguments("--lang=ko");
  options.addArguments(
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  );
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.setBinaryPath("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");

  console.error(`[MCP] Searching Google for: ${query}`);

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=ko`;
    await driver.get(searchUrl);
    await driver.sleep(2000);

    const body = await driver.findElement(By.tagName("body"));
    const bodyText = await body.getText();

    // 차단(봇 감지)되었는지 확인
    if (bodyText.length < 500) {
      return {
        content: [
          {
            type: "text",
            text: `Google에서 비정상 트래픽으로 감지하여 검색을 차단했습니다. 잠시 후 다시 시도해 주세요.\n\nIP: localhost\n응답: ${bodyText.substring(0, 200)}`,
          },
        ],
      };
    }

    // 검색 결과 파싱
    const resultElements = await driver.findElements(By.css("div.g, div[data-sokoban-container]"));
    const searchResults = [];

    for (let i = 0; i < Math.min(resultElements.length, 15); i++) {
      try {
        const el = resultElements[i];
        let title = "";
        let link = "";
        let snippet = "";

        try {
          const titleEl = await el.findElement(By.css("h3"));
          title = await titleEl.getText();
        } catch {
          continue;
        }

        try {
          const linkEl = await el.findElement(By.css("a"));
          link = await linkEl.getAttribute("href");
        } catch {
          link = "";
        }

        try {
          const snippetEl = await el.findElement(
            By.css(".VwiC3b, div[data-sncf], span.aCOpRe, .lEBKkf span, .hJNv6b")
          );
          snippet = await snippetEl.getText();
        } catch {
          snippet = "";
        }

        if (title) {
          let resultText = `${i + 1}. ${title}`;
          if (link && link.startsWith("http")) resultText += `\n   URL: ${link}`;
          if (snippet) resultText += `\n   ${snippet}`;
          searchResults.push(resultText);
        }
      } catch {
        continue;
      }
    }

    // 검색 결과가 없으면 body 전체에서 요약 추출
    let output;
    if (searchResults.length > 0) {
      output = `구글 검색 결과 (${query}):\n\n${searchResults.join("\n\n")}`;
    } else {
      // 대체 추출: heading 태그 기준으로 결과 추출
      const lines = bodyText.split("\n").filter((l) => l.trim().length > 0);
      const resultLines = lines.filter(
        (l) => l.length > 15 && !l.includes("Sign in") && !l.includes("Accessibility") && !l.includes("Google")
      );
      output = `구글 검색 결과 (${query}):\n\n${resultLines.slice(0, 20).join("\n")}`;
    }

    return {
      content: [
        {
          type: "text",
          text: output,
        },
      ],
    };
  } finally {
    await driver.quit();
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[MCP] Google Search MCP Server running on stdio");
}

main().catch((err) => {
  console.error("[MCP] Fatal error:", err);
  process.exit(1);
});
