// logging-middleware/index.js

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcG9vcnZpaTAyMkBnbWFpbC5jb20iLCJleHAiOjE3NTczMjIxMDMsImlhdCI6MTc1NzMyMTIwMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQwZGI1MzZhLTk3NjMtNGM4Yy1hZWQyLTFhZWFiZTg5OTI4NiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFwb29ydmkgc3JpdmFzdGF2YSIsInN1YiI6IjljZDM5ZGQ3LTU5MGQtNDdmMC05MWFkLWU4NDhhODI3ZGQwNyJ9LCJlbWFpbCI6ImFwb29ydmlpMDIyQGdtYWlsLmNvbSIsIm5hbWUiOiJhcG9vcnZpIHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjAxNjQxNTQwMDI0IiwiYWNjZXNzQ29kZSI6InNBV1R1UiIsImNsaWVudElEIjoiOWNkMzlkZDctNTkwZC00N2YwLTkxYWQtZTg0OGE4MjdkZDA3IiwiY2xpZW50U2VjcmV0IjoieVFYSGVHWFJZekR1UnR0eCJ9.AD7UFppq24II7hvbYkpg2yS5VRup6pDwmY00pSRYeaw";

const API_URL = "http://20.244.56.144/evaluation-service/logs";

// Allowed values
const VALID_STACKS = ["frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "api", "component", "hook", "page", "state", "style",
  "auth", "config", "middleware", "utils" // common ones
];

export async function Log(stack, level, pkg, message) {
  if (!VALID_STACKS.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    console.error(`Invalid package: ${pkg}`);
    return;
  }

  const payload = { stack, level, package: pkg, message };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to send log:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log("Log created:", data);
    return data;
  } catch (error) {
    console.error("Error sending log:", error);
  }
}
