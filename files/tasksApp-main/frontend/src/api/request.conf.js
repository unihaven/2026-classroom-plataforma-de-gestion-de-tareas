export default (user) => {
  return {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
};
