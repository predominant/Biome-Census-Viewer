# census-proxy

Census proxy is a simple Nginx server configured by default to route requests to the local Biome (or Habitat(tm)) supervisor.

It adds the `Access-Control-Allow-Origin: *` header to permit Javascript applications to send requests.

## Maintainers

Graham Weldon <graham@grahamweldon.com>

## Type of Package

Service package

## Usage

```
hab svc load grahamweldon/census-viewer
```

By default, the port `5555` is used to publish the new endpoint.

### Customize upstream

If you want to point to a different server or port for the backend census endpoint / supervisor, then adjust the configuration `upstream_url` like so:

```sh
echo 'upstream_url = "http://some-server.com:1234"' | \
  hab config apply census-proxy.default $(date +%s)
```

This service can be run on every server with supervisor, with very little impact. Its just Nginx, with a small footprint.
