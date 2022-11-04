const restrictedPaths = ['/api'];

const authMiddleware = async (context, next) => {
  const user = await context.state.session.get('user');

  if (user) {
    context.user = user;
  }

  console.log('auth middleware', user);
  if (
    !user &&
    restrictedPaths.some((path) =>
      context.request.url.pathname.startsWith(path)
    )
  ) {
    context.response.redirect('/login');
  } else {
    await next();
  }
};

export { authMiddleware };
