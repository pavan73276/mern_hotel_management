export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  var cookieName = '';
  switch(user.role){
    case 'Admin' : cookieName = 'adminToken';
                   break;
    case 'Staff' : cookieName = 'staffToken';
                   break;
    default : cookieName = 'userToken';
  }

  res.status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};



