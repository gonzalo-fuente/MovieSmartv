const fetchTMDBApi = async (url) => {
  let data = await fetch(url);

  return data.json();
};

export { fetchTMDBApi };
