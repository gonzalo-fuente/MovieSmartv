const fetchTMDBApi = async (url) => {
  let data = await fetch(url);

  // console.log(data.json());
  return data.json();
};

export { fetchTMDBApi };
