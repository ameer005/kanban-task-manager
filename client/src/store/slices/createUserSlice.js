const user = JSON.parse(localStorage.getItem("user"));

const createUserSlice = (set, get) => ({
  user: user || null,
  setUser: (user) => {
    set({ user: user });
  },
  removeUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});

export default createUserSlice;
