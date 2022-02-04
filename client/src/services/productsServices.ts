const parseJson = async (response: any) => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    throw new Error("Did not receive JSON, instead received: " + text);
  }
};

export async function fetchDataByUrl(url: string) {
  // try {
  //   await fetch(url) // Fetch the resource
  //     .then(parseJson)
  //     .then((result) => {
  //       console.log("My json: ", result);
  //     });

  //   // Do your JSON handling here
  // } catch (err) {
  //   // This probably means your response is text, do you text handling here
  //   console.log(err);
  // }
  try {
		const response = await fetch(url);
    console.log(response)
		return await response.json();
	} catch (err) {
		console.log(err);
	}
}

export async function getAllProducts() {
  const fetchUrl = "/api/products";
  return fetchDataByUrl(fetchUrl);
}
