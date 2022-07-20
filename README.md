# Horizon Stream

**Horizon Stream** is a new distribution of OpenNMS, inspired from the existing platform

See [PLATFORM](platform/README.md) for details on the work in progress.

**Make sure run mvn clean install** under shared-lib folder to make the library available if it not in the local .m2 repo before start skaffold

# Run Locally

Pulling published images:
```
./local-sample/run.sh local
```

Building local images and importing to cluster:
```
./local-sample/run.sh dev
```
