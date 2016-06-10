# MBC Arlington Intramurals

**Demo URL:** [URL goes here](URL goes here)

---

**Demo Site Password Protection**

**Username:** `mbcarlington`<br>
**Password:** `mbcarlington`

---

**CMS Super-Admin User**

**Username:** `mbcarlington`<br>
**Password:** `mbcarlington`

---

## Technical Details

### CSS

*This project uses BEM-style classes with namespaces. Source files are in <kbd>wp-content/themes/intramurals/src/scss</kbd> and are divided into subfolders by namespace. Namespaces follow the general convention laid out in [CSS Wizardry](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).*

#### CSS Regression Testing

The project uses [BackstopJS](https://github.com/garris/BackstopJS) for CSS regression testing. Tests are run as part of the `gulp build` task. Code should pass the regression tests before being committed and pushed, but this is not yet enforced via a pre-commit hook. If after reviewing the test results, you see that the test "failed" for an irrelevant reason (content updated, a deliberate style change, etc.), update the reference screenshots and recommit.

If you make an intentional style change, first run the regression tests as normal and verify that the only differences are your intentional changes. Once you've confirmed that, generate new reference screenshots:
```
gulp backstopjs:reference
```
Commit your code changes and the new screenshots.

After creating a new template, update <kbd>wp-content/themes/bsdstarter/backstop.json</kbd> so that the template will be tested going forward.

### JavaScript

*This project uses Browserify to manage JavaScript modules. The main <kbd>main.js</kbd> file declares project requirements and acts as the main controller. Individual pieces of functionality should be placed in <kbd>src/js/modules</kbd> and third-party plugins should be placed in <kbd>src/js/vendor/</kbd>.*

### Structure

<kbd>/wp-admin</kbd>: Wordpress core files. Do not make changes here. They will be overwritten when Wordpress updates.

<kbd>/wp-content</kbd>: The directory for Wordpress themes, plugins, and uploads.

- <kbd>/mu-plugins</kbd>: Must-use plugins. These plugins are loaded automatically and cannot be deactivated by the client. Custom post types should be defined here.

- <kbd>/plugins</kbd>: Wordpress plugins. Any third-party and custom-plugins (other than the must-use plugins) will go in this directory.

- <kbd>/themes</kbd>: Wordpress themes

  - <kbd>/bsdstarter</kbd>: Theme files for the Wordpress starter kit theme. Templates are located in this directory.

    - <kbd>/assets</kbd>: Contains static assets for the site. Most of these are compiled from the src directory

    - <kbd>/includes</kbd>: Theme functions, including custom shortcodes and modifications to the WYSWIYG editor

    - <kbd>/src</kbd>: Contains SCSS, JavaScript, and image source files

      - <kbd>/img</kbd>: Image sources. There is a Gulp task set up to minify images and copy them to the assets folder automaticallty

      - <kbd>/js</kbd>: JavaScript source files

        - <kbd>/modules</kbd>: Browserify modules. These can be required by other modules that depend on them or by `main.js`

        - <kbd>/vendor</kbd>: Third-party plugins. Only those files prepended with `_` will be included in the concatenate task. Other plugins can be required by a module or `main.js` where appropriate.

        - <kbd>/main.js</kbd>: The main JavaScript file for the project.

      - <kbd>/scss</kbd>: SCSS Stylesheets

        - <kbd>/vendor</kbd>: Stylesheets for third-party plugins

        - <kbd>/components</kbd>: Stylesheets for CSS components

        - <kbd>/style.scss</kbd>: The main stylesheet for the project. It must compile to a file named style.css that is in the root of the theme directory (not within <kbd>/assets</kbd>) and include a comment at the top giving the theme name

    - <kbd>/views</kbd>: Twig templates used to generate the front-end markup

<kbd>/wp-includes</kbd>: More Wordpress core files. Do not make changes here. They will be overwritten when Wordpress updates.

### Shortcodes
Custom shortcodes are located in <kbd>/wp-content/themes/bsdstarter/includes/bsdstarter_shortcodes.php</kbd>.

- `[quote]Quote text[/quote]`, `[quote author="Author Name"]Quote text[/quote]`: Inserts a pullquote with optional author
- `[stat value="100" label="Stat text"]`: Inserts a callout stat
- `[iframe type="youtube" id="2jE59c9ncio"]`, `[iframe type="vimeo" id="142354343"]`,
`[iframe src="http://yoururlhere.com"]`: Inserts a video iframe, wrapped in Foundation's flex-video class

--

## Local Environment Configuration

### Database
To get a current snapshot of the database, log in to WP Engine and use the phpMyAdmin tool to download an SQL export.

### wp-config
After cloning the repo and downloading the database, save a copy of `wp-config-sample.php` as `wp-config.php`. (Don't delete the original!) Add the following lines to your wp-config file:
```
define('WP_DEBUG', true);
define('WP_HOME', 'http://yourlocalurl');
define('WP_SITEURL', 'http://yourlocalurl');
```
Add the database credentials to that file as well.

### Development Dependencies

- Node
- Gulp
- Browsersync
- Sass
- Browserify
- PhantomJS (`sudo npm install -g phantomjs`)
- CasperJS (`sudo npm install -g casperjs`)

Project-level development dependences can be found in the theme's `package.json` file.

### Deploying

To deploy:

1. Run `gulp build` to minify CSS and JS for production
2. Commit the compiled files
3. Push to the local repo `git push origin master`