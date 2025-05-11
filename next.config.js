const nextConfig = {
  output: 'export', // Add this line for static export
  /* config options here */
  // If you plan to host on GitHub Pages in a repository named <username>.github.io/<reponame>,
  // you might also need to set basePath. For example, if your repo is yblith.github.io/my-app,
  // then basePath would be '/my-app'.
  // If your repo is just yblith.github.io (meaning it's the root for your GitHub Pages site),
  // you likely don't need basePath.
  // basePath: '/your-repo-name', // Uncomment and set if needed

  // If your images are not loading correctly after export, you might need this:
  // images: {
  //   unoptimized: true,
  // },
};

module.exports = nextConfig;
