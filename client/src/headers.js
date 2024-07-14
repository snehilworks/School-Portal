const token = localStorage.getItem("token");

const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default header;
