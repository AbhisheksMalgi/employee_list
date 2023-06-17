const concurrently = require("concurrently");

concurrently([
  {
    command: "json-server --watch server/db.json --port 9000",
    name: "json-server",
    prefixColor: "cyan",
  },
  { command: "npm run serve", name: "vue-app", prefixColor: "magenta" },
]);
