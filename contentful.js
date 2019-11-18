const spaceId = "sxbrtelqz7wh";
const environmentId = "master";
const accessToken = "LSqR_bf52ZiU3oBx77kZBBV3zpQ5BEzTK2KWLjkM6ew";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=-fields.order&content_type=menuItem`;

const sectionTag = document.querySelector("section.grid");

const fetchItems = async () => {
  let response = await fetch(url);
  let data = await response.json();

  const assets = data.includes.Asset;

  let items = data.items.map(item => {
    let imageUrl = "./assets/image1.jpg";

    const imageId = item.fields.image.sys.id;
    const imageData = assets.find(asset => asset.sys.id == imageId);

    if (imageData) {
      imageUrl = imageData.fields.file.url;
    }
    item.fields.image = imageUrl;
    return item.fields;
  });
  return items;
};

fetchItems().then(data => {
  sectionTag.innerHTML = "";
  data.forEach(item => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
        <div class="item">
          <img src=${item.image}>
          <div class="title">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
          </div>

          <p>${item.description}</p>
        </div>
      `;
  });
});
