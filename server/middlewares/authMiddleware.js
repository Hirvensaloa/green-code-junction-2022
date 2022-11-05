const restrictedPaths = ['/api'];

const authMiddleware = async (context, next) => {
  // const user = await context.state.session.get('user');
  const user = {
    id: 'c5443fae-3a22-4dbb-82f0-136b8f277435',
  };

  if (user) {
    context.user = user;
  }

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
