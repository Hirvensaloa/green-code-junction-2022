import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import { addUser, getUser } from '../../service/userService.js';

const processLogin = async ({ request, response, state }) => {
  const body = request.body({ type: 'form' });
  const params = await body.value;

  const user = await getUser(params.get('username'));
  if (!user) {
    response.status = 401;
    return;
  }

  const passwordMatches = await bcrypt.compare(
    params.get('password'),
    user.password
  );

  if (!passwordMatches) {
    response.status = 401;
    return;
  }

  await state.session.set('user', user);
  response.status = 204;
};

const registerUser = async ({ request, response }) => {
  const body = request.body({ type: 'form' });
  const params = await body.value;

  const username = params.get('username');
  const password = params.get('password');

  if (username && password) {
    await addUser(username, await bcrypt.hash(password));

    response.redirect('/login');
  } else {
    response.status = 400;
  }
};

export { processLogin, registerUser };
