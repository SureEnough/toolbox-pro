const ngrok = require("ngrok");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const dist = path.join(__dirname, "dist");
const port = 8080;
const mime = {".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".txt":"text/plain",".xml":"application/xml"};

async function main() {
  try { execSync("pkill -f ngrok 2>/dev/null; fuser -k 4040/tcp 2>/dev/null; fuser -k 8080/tcp 2>/dev/null"); } catch {}
  await new Promise(r => setTimeout(r, 3000));

  const url = await ngrok.connect({ addr: port, authtoken: "3DWZontqMpyFtB7s6ApLrOzg6OZ_7hRD6B56A2WxiZPFJTYYR" });

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split("?")[0];
    if (urlPath === "/") urlPath = "/index.html";
    let fp = path.join(dist, urlPath);
    const ext = path.extname(fp);
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      res.writeHead(200, {"Content-Type": mime[ext] || "application/octet-stream"});
      fs.createReadStream(fp).pipe(res);
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.createReadStream(path.join(dist, "index.html")).pipe(res);
    }
  });

  server.listen(port, "0.0.0.0", () => {
    const lines = [];
    lines.push("========================================");
    lines.push("  ToolBox Pro - ngrok 公网部署完成！");
    lines.push("========================================");
    lines.push("");
    lines.push("🔗 公网地址: " + url);
    lines.push("   本地地址: http://localhost:" + port);
    lines.push("");
    lines.push("--- 页面测试 ---");

    const pages = ["", "/tools/password", "/tools/qrcode", "/tools/json", "/tools/color", "/tools/text", "/tools/calculator", "/tools/image", "/tools/pdf"];
    let allOk = true;
    for (const p of pages) {
      try {
        const code = execSync(`curl -s -o /dev/null -w '%{http_code}' --max-time 10 "${url}${p}"`, { timeout: 15000 }).toString().trim();
        if (code !== "200") allOk = false;
        lines.push(`  ${code === "200" ? "✅" : "❌"} ${p || "/"} → HTTP ${code}`);
      } catch(e) {
        allOk = false;
        lines.push(`  ❌ ${p || "/"} → ERROR`);
      }
    }

    lines.push("");
    lines.push("--- 资源加载 ---");
    try {
      const html = execSync(`curl -s --max-time 10 "${url}/"`, { timeout: 15000 }).toString();
      const js = html.match(/\/assets\/[^"]*\.js/)?.[0];
      const css = html.match(/\/assets\/[^"]*\.css/)?.[0];
      if (js) lines.push(`  ✅ JS: ${execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' --max-time 10 "${url}${js}"`, {timeout:15000}).toString().trim()}`);
      if (css) lines.push(`  ✅ CSS: ${execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' --max-time 10 "${url}${css}"`, {timeout:15000}).toString().trim()}`);
    } catch(e) { lines.push("  ❌ " + e.message); }

    lines.push("");
    lines.push("========================================");
    lines.push(allOk ? "✅ 全部测试通过！公网可正常访问" : "⚠️ 部分测试失败");
    lines.push("========================================");
    lines.push("");
    lines.push("🌐 在浏览器打开: " + url);
    lines.push("   工具页面示例: " + url + "/tools/password");

    const output = lines.join("\n");
    fs.writeFileSync("/tmp/deploy-result.txt", output);
    console.log(output);
  });
}

main().catch(e => {
  fs.writeFileSync("/tmp/deploy-result.txt", "ERROR: " + e.message);
  console.error(e.message);
});
