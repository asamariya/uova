const spaceId = "sxbrtelqz7wh";
const environmentId = "master";
const accessToken = "LSqR_bf52ZiU3oBx77kZBBV3zpQ5BEzTK2KWLjkM6ew";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`;

const sectionTag = document.querySelector("section.grid");

let items;
const fetchItems = async () => {
  let response = await fetch(url);
  let data = await response.json();
  items = data.items.map(item => {
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
        ${item.title}
      </div>
    
    `;
  });
});
