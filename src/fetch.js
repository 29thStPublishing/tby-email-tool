import * as requests from 'superagent';

export default function fetch(url, options) {
  /* @param {String} url The url to call
     @param {Object} options {method, headers, type}
     @return {Promise} 
  */

  // For more on extending this function, check out the superagent docs:
  // https://github.com/visionmedia/superagent 

  var method = requests.get
    , type = 'json'
    , headers = {}
    , options = options || {}
    , user = ''
    , pw = ''
    ;
  // If the method in options is post or patch, use post or patch
  if (options.method && options.method.toLowerCase() === 'post') {
    method = requests.post;
  }
  else if (options.method && options.method.toLowerCase() === 'patch') {
    method = requests.patch;
  }
  // Also allows the POST type of form
  if (options.type && options.type.toLowerCase() === 'form') {
    type = options.type;
  }
  // Checks for headers
  if (options.headers) {
    headers = options.headers;
  }
  if (options.auth) {
    user = options.auth.username;
    pw = options.auth.password;
  }

  return new Promise((resolve, reject) => {
    method(url)
      .type(type)
      .auth(user, pw)
      .set(headers)
      .send(options.body)
      .end((err, res) => {
        // If there is an error or the res is not ok, return the error (reject it)
        if(err) {
          var message = `Fetching ${url} returned a status ${err.status}. Detail: ${JSON.stringify(err)}`
          reject(Error(message));
        }
        else if (!res.ok) {
          var message = `Fetching ${url} returned a status ${res.status}. Detail: ${JSON.stringify(res.body)}`
          reject(Error(message));
        }
        else {
          // If res.body is empty, try to parse the res.text
          if (!Object.keys(res.body).length) {
            try {
              res.body = JSON.parse(res.text);
            }
            catch (err) {
              // If a SyntaxError is thrown, this string cannot become an object.
              // Return it as is
              if (err instanceof SyntaxError) {
                res.body = res.text;
              }
            }
          }
          // Return the res.body
          resolve(res.body);
        }
      });
  });
}