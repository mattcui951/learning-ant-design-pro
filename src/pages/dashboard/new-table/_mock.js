let dataList = [
  {
    key: 1,
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: 2,
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: 3,
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];

function fakeList() {
  const list = [
    {
      key: 1,
      firstName: "John",
      lastName: "Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"]
    },
    {
      key: 2,
      firstName: "Jim",
      lastName: "Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"]
    },
    {
      key: 3,
      firstName: "Joe",
      lastName: "Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    }
  ];
  dataList = list;
  return list;
}
let currentKey = 4;

function getFakeList(req, res) {
  const params = req.query;
  const result = fakeList();
  console.log("aaaaaaaaaaaaaaaaa");
  return res.json(result);
}

function postFakeList(req, res) {
  const {
    /* url = '', */
    body
  } = req; // const params = getUrlParams(url);
  console.log("lllllllllllll");
  console.log(body);
  const { method, id } = body; // const count = (params.count * 1) || 20;

  let result = dataList;

  switch (method) {
    case "delete":
      result = result.filter(item => item.key !== id);
      console.log(result);
      dataList = result;
      break;

    case "update":
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = { ...item, ...body };
        }
      });
      break;

    case "post":
      result.push({
        key: currentKey,
        ...body.params
      });
      console.log(result);
      currentKey = currentKey + 1;
      break;

    default:
      break;
  }

  return res.json(result);
}

export default {
  "GET  /api/fake2_list": getFakeList,
  "POST  /api/fake2_list": postFakeList
};
