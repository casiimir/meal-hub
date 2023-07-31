export const localStorageManager = {
  setData: (nomeKey, valore) => {
    localStorage.setItem(nomeKey, JSON.stringify(valore));
  },
  getData: (nomeKey) => {
    let get = localStorage.getItem(nomeKey);
    if (get != undefined) {
      return JSON.parse(get);
    } else {
      return null;
    }
  },
};
