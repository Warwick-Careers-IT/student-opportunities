

# Warwick student opportunities Prototype

This kit provides:

1. **A local development environment with design components, templates and a way to quickly publish prototypes to share with others.**

The kit is not a production framework. Don't use the kit as a base for a production service.

## local prototyping environment

This codebase allows you to quickly get a local node server running using nunjucks templating, Express, SASS compiling and LiveReload. This drastically speed up development time during the prototyping/development phase. It includes the latest warwick ID7 design as nunjucks templates.

The codebase includes build scripts for things like SASS to CSS and static site generation. Running:

```javascript
  gulp build
```

Will deploy the site in the dist directory for use as a demo you can share with others.

Pushing changes back to the remote git repository will deploy these static build files to the following address:

https://warwick-student-opps.netlify.com/

See the [technical docs for more details of how to get setup](docs/technical/introduction.md)
