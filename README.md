## A Node.js Application metrics statsd fromat collector that sends the metrics over the UDP to be stored in the influxdb through telegraf

> `npm install --save influx-statsd`

telegraf templates

```
  templates = [
      "*.*.*.*.* service.method.url.status.measurement.field",
      "*.*.*.*   service.measurement.measurement.measurement",
      "*.*.*     service.measurement.measurement",
      "*.*       service.measurement"
  ]
```
