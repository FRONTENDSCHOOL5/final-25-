import BASE_URL from '../utils/baseUrl';

const userAPI = {
  async getSignUp(username, email, password, accountname, intro, image) {
    const userData = {
      user: {
        username,
        email,
        password,
        accountname,
        intro,
        image,
      },
    };

    const response = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  },

  async getLogin(email, password) {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const data = await response.json();
    return data;
  },

  async checkEmailValid(email) {
    const response = await fetch(`${BASE_URL}/user/emailvalid`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
        },
      }),
    });
    const data = await response.json();
    return data;
  },

  async checkAccountValid(email) {
    console.log('userApi.js-email :', email);

    const response = await fetch(`${BASE_URL}/user/emailvalid`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
        },
      }),
    });
    const responseJson = await response.json();
    return responseJson;
  },

  async getMyInfo(token) {
    console.log('token : ', token);
    const response = await fetch(`${BASE_URL}/user/myinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('data : ', data);
    return data;
  },
};

export default userAPI;
