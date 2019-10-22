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
