const getTokenConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem("blogpostUser"));
  if (userInfo === null) {
    return null;
  } else {
    const { token } = userInfo;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
};

export { getTokenConfig };
