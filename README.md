# Coursetable

Coursetable is made of two big parts:

1.  **Website**: The site you see when you go to [coursetable.com](https://coursetable.com). The code for this – the front-end site as well as the various back-end scripts that handle user actions – is contained within this repository.
2.  **Crawler**: The scripts behind the scenes that actually get all the data from Yale’s websites. The code for this is in our [ferry](https://github.com/coursetable/ferry) repository.

## Repository Layout

The various functions of the website are compartmentalized as follows:

- `/api`: An Express server for backend logic.
- `/frontend`: The current face of the site, built with React.
- `/web`: PHP scripts migrated from the old site.
- `/proxy`: Proxy configuration for relaying connections between services (e.g. authentication headers, CAS cookies, etc.)
- `/docker`: Configuration files for running everything together in Docker.
- `/legacy`: Static HTML files from the old site.
- `/scripts` and `/sysadmin`: Administration scripts and bootstrapping tools.

## Architecture

See [this architecture diagram](https://jamboard.google.com/d/1kDZUh1WwqN6tIM7fn6C451oFyqxl1pzpIqTJuK0JE8U/viewer).

<!-- TODO: that diagram is a bit outdated -->

## How to develop

Check out [the getting started guide](docs/getting-started.md).

## Contributing

**Contributing code:**

1. Create a branch for your feature. This can usually be done with `git checkout -b <username>/<feature_name>`
2. _make changes._
3. Create some commits and push your changes to the origin.
4. Create a pull request and add a few reviewers. In the pull request, be sure to reference any relevant issue numbers.
5. Once the pull request has been approved, merge it into the master branch.

**Style:**

For different languages:

- TypeScript & JavaScript: We use [prettier](https://prettier.io/) to automatically format the code. Make sure you use your editor's integration!
- PHP: We use [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) to maintain coding standards; generally, it's 4 spaces for tabs, camelCase for variables, and follow whatever else that's in use right now.

We have automated checks set up that will run for every commit and pull request.

**Roadmap:**

We use GitHub issues to track bugs and feature requests: https://github.com/coursetable/coursetable/issues.

We use GitHub projects to manage everything and do planning: https://github.com/orgs/coursetable/projects/2.

## Setting up and deploying to prod

Check out [How to deploy](docs/how-to-deploy.md).

## Steps for setting up debugging on Windows

1.  Change `web/includes/ProjectCommon.php` to point to a remote database
2.  Run `composer install` in `web/libs` and in `crawler`
3.  In your php.ini, make sure cURL, MySQLi, SQLite3 are enabled
4.  Run `php Build.php` in `web/tools`
5.  Run `php RegenerateDataFiles.php` in `crawler` to either generate the JSON locally

## Debugging Tips

`Fatal error: Uncaught SmartyException: unable to write file [...]`: execute `chmod -R 777 web/gen` in your terminal.
