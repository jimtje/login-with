module.exports = {
  Ctor: require('passport-discord.js').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_DISCORD_CLIENTID;
    const clientSecret = env.LW_DISCORD_CLIENTSECRET;
    if (clientID && clientSecret){
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
    preHook: (req, opts) => {
    opts.scope = ['email', 'identify']
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    let name = profile.username + profile.discriminator;
    let id = profile.id;
    let email = profile.email;
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        id: id,
        username: email,
        name: name,
        provider: 'discord',
        photo: null
      }
    })
  }
};
