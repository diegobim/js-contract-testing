## Contract Testing using PactJs

> Totally based on https://github.com/eduardopc/contract-testing-pactjs, kudos!

### Pre-Reqs:

* Node
* NPM
* Docker

### 1. Restore dependencies

```bash
npm install
```

### 2. Generate pact:

```bash
make pact
```

### 3. Publish to Broker:


#### 3.1 Raise Broker infrastructure:
```bash
make up
```
#### 3.2 Publish pact:
```bash
make publish
```

### 4. Verify pact:
```bash
make verify
```