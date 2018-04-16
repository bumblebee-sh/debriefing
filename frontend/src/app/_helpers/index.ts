export const parse_query = () => {
  const url = window.location.hash;
  if (!url) {
    return {};
  }
  return url.substr(1).split('&')
    .map( el => el.split('='))
    .reduce( (old, current) => {
      old[current[0]] = current[1];
      return old;
    }, {});
};

export const put_query = url => {
  let query_string = '';
  for ( const key in url ) {
    query_string += `&${key}=${url[key]}`;
  }
  return query_string.substr(1);
};
