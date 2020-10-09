/**
 * Auth0 Rule: Indicate user needs to complete registration details and redirect to registration completion page
 */
function (user, context, callback) {
  // Short-circuit if the user is signed up already, is using a refresh token,
  // or is using silent auth
  if (context.stats.loginsCount > 1 || context.protocol === 'oauth2-refresh-token' ||         context.request.query.prompt === 'none') {
    return callback(null, user, context);
  }
  // Set redirect url
  context.redirect = {
    url: "https://pure-and-lazy.herokuapp.com/admin"
  };
  // Set registration status
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.registration_complete = false;
  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
