# Indivisible Denver Blog Theme

## Setup

First, you'll need a working local install of Ghost.  Follow the [installation
instructions](http://support.ghost.org/getting-started/) for your platform.  The
default configuration should work without alteration.

Next, clone this repository into a directory in `$GHOST_PATH/content/themes/`.

Change to your theme directory and run `npm install`.  If you don't already have
it, you'll also need to install the `gulp` tool with `npm install -g gulp-cli`.

From within the theme directory, you can run `gulp serve` to, among other tasks,
run your blog.  Start your development server and visit
http://localhost:2368/ghost.  Walk through the setup wizard if you haven't
already, then under the _General_ tab activate the `indivisibledenver` theme.

Finally, you might want to populate your development database with some dummy
data.  This is optional but heavily encouraged.  I'm using [nickisnoble's ghost
theme unit test](https://github.com/nickisnoble/ghost-theme-unit-test) but feel
free to seed your DB however you prefer.

## Develpment

**All commands expect to be run from inside the theme folder.**

* **`gulp serve`**: Runs the Ghost server and rebuilds all the assets as needed.
