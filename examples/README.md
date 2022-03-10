# Examples

Created some simple examples for quick and easy use.

## Created with `keynote-cli`

```bash
# Install command tool
npm i -g kenote-cli
# Download the example configuration file
curl -O https://raw.githubusercontent.com/kenote/kenote.js/main/examples/congif.yml
# import configuration file
kenote config ./congif.yml
# Create New Project from Example
kenote create {PROJECT_NAME}
```

## Create with `npx`

```bash
# Create New Project from Example
npx kenote create --example {EXAMPLE_URL} {PROJECT_NAME}
```