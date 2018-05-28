const appmetrics = require("appmetrics");
const StatsD = require("node-statsd");

const watch = function({ host = null, port = null, serviceName = null }) {
  if (serviceName == null || typeof serviceName !== "string") {
    throw new Error("service name is required and it must be string");
  }
  host = host == null ? "localhost" : host;
  port = port == null ? "8125" : port;
  const prefix = serviceName;
  const suffix = "";
  const globalize = false;
  const cacheDns = false;
  const mock = false;
  const global_tags = "";

  const monitor = appmetrics.monitor();
  const client = new StatsD(
    host,
    port,
    prefix,
    suffix,
    globalize,
    cacheDns,
    mock,
    global_tags
  );

  monitor.on("cpu", function handleCPU(cpu) {
    client.gauge("cpu.process", cpu.process);
  });

  monitor.on("memory", function handleMem(memory) {
    client.gauge("memory.process.physical", memory.physical);
  });

  monitor.on("eventloop", function handleEL(eventloop) {
    client.gauge("eventloop.latency.avg", eventloop.latency.avg);
  });

  monitor.on("gc", function handleGC(gc) {
    client.gauge("gc.size", gc.size);
    client.gauge("gc.used", gc.used);
    client.timing("gc.duration", gc.duration);
  });

  monitor.on("http", http => {
    client.timing(
      `${http.method}.${http.url}.${http.statusCode}.http.duration`,
      http.duration
    );
  });

  monitor.on("https", https => {
    client.timing(
      `${https.method}.${https.url}.${https.statusCode}.http.duration`,
      https.duration
    );
  });

  monitor.on("http-outbound", http => {
    client.timing(
      `${http.method}.${http.url}.${http.statusCode}.httpoutbound.duration`,
      https.duration
    );
  });

  monitor.on("https-outbound", https => {
    client.timing(
      `${https.method}.${https.url}.${https.statusCode}.httpoutbound.duration`,
      https.duration
    );
  });

  monitor.on("socketio", function handleSocketio(socketio) {
    client.timing(
      "socketio." + socketio.method + "." + socketio.event,
      socketio.duration
    );
  });

  return client;
};

exports.Metrics = watch;
