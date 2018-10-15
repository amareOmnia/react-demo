# react-demo

This is a demo site I'm using to learn/practice React in frontend web development. All javascript files were written by me, while most css layout files were pre-made by Wes Bos. It emulates a storefront that uses Firebase to keep a live database of fish inventories and orders.

# Local Installation

Only `npm` is needed to run locally, and must be used to install dependencies. In the site directory, use: <br> <br>
`npm install` <br> <br>
Once that is completed, the custom command `npm run dev` will do two things: <br>
- create a local webserver (localhost:3000) to open in the default browser
- monitor both CSS and JS files for changes, and refresh site upon each file save

# Publishing

<p>All following commands must be run from the site directory.</p>
<h2>now.sh</h2>
  <blockquote>
    <li>
      A build folder has already been compiled, but if changes are made and need to be published, one must run <code> npm run build</code>
    </li>
    <li>
      'Now' must be installed globally on the system. Check with <code>now -v</code> and if no command exists, install the package with <code>npm i -g now</code>
    </li>
    <li>
      The next script <code>npm run start</code> will take the build directory and publish it to a temporary .now.sh domain with all associated dependencies. If you haven't initialized 'now' before, it will ask for an email to verify account creation. A progress domain is provided, which will forward to the published site once it's compiled.
    </li>
  </blockquote>

<h2>Netlify</h2>
<p>The original published site can be found at <a href="https://cooper-fish.netlify.com/" title="cooper-fish-website">cooper-fish.netlify.com</a></p>
  <blockquote>
    <li>
      <code>npm run build</code> is also used here when a new build directory is needed. However, another file must be added called <code>_redirects</code> to build/ in order for page refreshes to work. The file should contain one line of text: <code>/* /index.html 200</code>
    </li>
    <li>
      Netlify must be installed globally <code>npm i -g netlify</code>
    </li>
    <li>
      To publish a draft site, use <code>netlify deploy</code>. Follow the personal instructions, and when prompted for deploy path, enter <code>build</code>. Adding the <code>--prod</code> tag will make the site public, and provide the permanent address
    </li>
  </blockquote>