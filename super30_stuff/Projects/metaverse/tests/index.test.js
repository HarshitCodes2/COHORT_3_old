const axios2 = require("axios");
const WebSocket = require("ws");

// import express from "express";

const axios = {
  post: async (...args) => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  put: async (...args) => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};

const BACKEND_URL = "http://localhost:3000"; // subject to change
const WS_URL = "ws://localhost:8080"; // subject to change

describe("Authentication", () => {
  test("User and Admin can only signup once", async () => {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    const respone1admin = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "admin",
    });

    expect(respone1admin.status).toBe(200);
    expect(respone1admin.data.userId).toBeDefined();

    const respone2admin = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "admin",
    });

    // console.log(
    //   "1232131233112321312331123213123311232131233112321312331123213123311232131233112321312331"
    // );
    // console.log(respone2admin);

    expect(respone2admin.status).toBe(400);

    const username2 = "harshit" + Math.random() + "@gmail.com";

    const respone1user = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password,
      type: "user",
    });

    expect(respone1user.status).toBe(200);
    expect(respone1user.data.userId).toBeDefined();

    const respone2user = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password,
      type: "user",
    });

    expect(respone2user.status).toBe(400);
  });

  test("User can signin only when they have signed up", async () => {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    const respone1AdminLogin = await axios.post(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username: username,
        password: password,
      }
    );

    // console.log(respone1AdminLogin);

    expect(respone1AdminLogin.status).toBe(400);

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "admin",
    });

    const respone2AdminLogin = await axios.post(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username: username,
        password: password,
      }
    );

    expect(respone2AdminLogin.status).toBe(200);
    expect(respone2AdminLogin.data.token).toBeDefined();

    const username2 = "harshit" + Math.random() + "@gmail.com";

    const respone1UserLogin = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username2,
      password: password,
    });

    expect(respone1UserLogin.status).toBe(400);

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password,
      type: "user",
    });

    const respone2UserLogin = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username2,
      password: password,
    });

    expect(respone2UserLogin.status).toBe(200);
    expect(respone2UserLogin.data.token).toBeDefined();
  });
});

describe("User Information", () => {
  let userToken;
  let adminToken;
  let avatarId;
  let userId;
  let adminId;

  beforeAll(async () => {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "user",
    });

    userId = response.data.userId;
    // console.log("UserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUserUser");
    // console.log(userId);

    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username,
      password: password,
    });

    userToken = res.data.token;
    // console.log(userToken);

    const username2 = "harshit" + Math.random() + "@gmail.com";
    const password2 = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password2,
      type: "admin",
    });

    adminId = response.data.userId;

    const res2 = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username2,
      password: password2,
    });

    // console.log("ADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMINADMIN");
    // console.log(res2);

    adminToken = res2.data.token;
    // console.log(adminToken);

    const res3 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    avatarId = res3.data.avatarId;

    // console.log(res3);
  });

  test("Update User Avatar is possible only after login and correct avatarId is provided", async () => {
    // console.log(avatarId);
    // console.log(typeof avatarId);

    const res = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: avatarId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // console.log("REsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREsREs");
    // console.log(res.data);

    expect(res.status).toBe(200);
    expect(res.data.avatarId).toBeDefined();

    const res2 = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: "some value that is incorrect",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // console.log(res2);

    expect(res2.status).toBe(400);

    const res3 = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {});

    expect(res3.status).toBe(403);
  });

  test("Get available Avatars", async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
    // console.log(res.data.avatars);

    expect(res.data.avatars.length).not.toBe(0);
  });

  test("Get Users Metadata", async () => {
    // console.log(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=${userId}`);

    const res = await axios.get(
      `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=${userId}`
    );
    expect(res.data.avatars.length).toBe(1);
    expect(res.data.avatars[0].userId).toBe(userId);
  });
});

describe("Space Dashboard", () => {
  let adminToken;
  let elementId1;
  let elementId2;
  let mapId;
  let adminId;
  let userId;
  let userToken;
  let spaceId;

  beforeAll(async () => {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    const adminSignUp = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "admin",
    });

    adminId = adminSignUp.data.userId;

    const adminSignIn = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username,
      password: password,
    });

    adminToken = adminSignIn.data.token;

    const element1 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId1 = element1.data.id;

    const element2 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId2 = element2.data.id;
    // console.log(elementId2);

    const map = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: elementId1,
            x: 20,
            y: 20,
          },
          {
            elementId: elementId1,
            x: 18,
            y: 20,
          },
          {
            elementId: elementId2,
            x: 19,
            y: 20,
          },
          {
            elementId: elementId2,
            x: 19,
            y: 20,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = map.data.id;

    const username2 = "harshit" + Math.random() + "@gmail.com";

    const userSignUp = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password,
      type: "user",
    });

    userId = userSignUp.data.userId;

    const userSignIn = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username2,
      password: password,
    });

    userToken = userSignIn.data.token;
  });

  test("User is able to create space with mapId or Dimensions or both", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    spaceId = res.data.spaceId;

    // console.log(res.data);
    expect(res.status).toBe(200);
    expect(res.data.spaceId).toBeDefined();

    const res2 = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // spaceId = res2.data.spaceId;
    expect(res2.status).toBe(200);
    expect(res2.data.spaceId).toBeDefined();

    const res3 = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    spaceId = res3.data.spaceId;
    // console.log(res3);

    expect(res3.status).toBe(200);
    expect(res3.data.spaceId).toBeDefined();
  });

  test("User is not able to create space in absence of both dimensions and map id or missing auth", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(res.status).toBe(400);

    const res2 = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: "asdad",
      },
      {}
    );

    expect(res2.status).toBe(403);
  });

  test("User is able to only delete a valid space", async () => {
    const res0 = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // console.log(res0.data);
    spaceId = res0.data.spaceId;

    const res1 = await axios.delete(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    // console.log(
    //   "res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1res1"
    // );
    // console.log(res1);
    expect(res1.status).toBe(200);

    const res2 = await axios.delete(`${BACKEND_URL}/api/v1/space/jhdadmn`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    // console.log(
    //   "res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2res2"
    // );
    // console.log(res2);
    expect(res2.status).toBe(400);
  });

  test("User is not able to delete someone else's space", async () => {
    const res0 = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const res1 = await axios.delete(
      `${BACKEND_URL}/api/v1/space/${res0.data.spaceId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(res1.status).toBe(400);
  });

  test("Admin does not have any space initially", async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.data.spaces.length).toBe(0);

    const res0 = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const res2 = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res2.data.spaces.length).not.toBe(0);
    const filteredSpace = res2.data.spaces.find(
      (space) => space.id === res0.data.spaceId
    );
    expect(filteredSpace).toBeDefined();
  });

  test("User is able to get his created spaces", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const res2 = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    expect(res2.data.spaces.length).not.toBe(0);
  });
});

describe("Arena Endpoints", () => {
  let adminToken;
  let adminId;
  let elementId1;
  let elementId2;
  let mapId;
  let spaceId;

  beforeAll(async () => {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    const adminSignUp = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "admin",
    });

    adminId = adminSignUp.data.userId;

    const adminSignIn = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username,
      password: password,
    });

    adminToken = adminSignIn.data.token;

    const element1 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId1 = element1.data.id;
    // console.log("elementId1");
    // console.log(elementId1);

    const element2 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId2 = element2.data.id;
    // console.log("elementId2");
    // console.log(elementId2);

    const map = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: elementId1,
            x: 20,
            y: 20,
          },
          {
            elementId: elementId1,
            x: 18,
            y: 20,
          },
          {
            elementId: elementId2,
            x: 19,
            y: 20,
          },
          {
            elementId: elementId2,
            x: 19,
            y: 20,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = map.data.id;
    // console.log("mapId");
    // console.log(mapId);

    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    spaceId = res.data.spaceId;
    // console.log("spaceId");
    // console.log(spaceId);
  });

  test("Get a Space", async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    // console.log(res.data.elements);

    expect(res.data.dimensions).toBe("100x200");
    expect(res.data.elements.length).toBe(4);
  });

  test("Incorrect SpaceID return 400", async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/invalidId`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.status).toBe(400);
  });

  test("Add an element to the space", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        elementId: elementId2,
        spaceId: spaceId,
        x: 50,
        y: 20,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(res.status).toBe(200);
  });

  test("Add an element to the space outside of walls fails", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        elementId: elementId2,
        spaceId: spaceId,
        x: 5009890,
        y: 20998,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(res.status).toBe(400);
  });

  test("Adding an non-existent element to the space gives 400", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        elementId: "elementId2",
        spaceId: spaceId,
        x: 50,
        y: 20,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    expect(res.status).toBe(400);
  });

  test("Delete an element from the space", async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    // console.log(res.data);
    const elementId = res.data.elements[0].id;
    // console.log(elementId);

    const delRes = await axios.delete(`${BACKEND_URL}/api/v1/space/element`, {
      data: {
        spaceId: spaceId,
        id: elementId,
      },
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    // console.log(delRes.data);

    const res2 = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res2.data.dimensions).toBe("100x200");
    expect(res2.data.elements.length).toBe(4);
  });
});

describe("Admin/Map Creator endpoints", () => {
  let adminToken;
  let userToken;
  let elementId;
  let avatarId;
  let mapId;

  beforeAll(async () => {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "admin",
    });

    const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username,
      password: password,
    });

    adminToken = res.data.token;

    const username2 = "harshit" + Math.random() + "@gmail.com";

    const userSignUp = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password,
      type: "user",
    });

    userId = userSignUp.data.userId;

    const userSignIn = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username2,
      password: password,
    });

    userToken = userSignIn.data.token;
  });

  test("Only Admin can Create an Element", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId = res.data.id;

    expect(res.status).toBe(200);
    expect(res.data.id).toBeDefined();

    const res2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
      width: 1,
      height: 1,
      static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
    });

    expect(res2.status).toBe(403);

    const res3 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    expect(res3.status).toBe(403);
    // console.log(res3.data);
  });

  test("Only Admin can Update an Element", async () => {
    // console.log(`${BACKEND_URL}/api/v1/admin/element/${elementId}`);

    const res = await axios.put(
      `${BACKEND_URL}/api/v1/admin/element/${elementId}`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // console.log(res.data);
    expect(res.status).toBe(200);

    const res2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
    });

    expect(res2.status).toBe(403);
  });

  test("Only Admin can Create an Avatar", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    avatarId = res.data.avatarId;
    expect(res.status).toBe(200);
    expect(res.data.avatarId).toBeDefined();

    const res2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
      name: "Timmy",
    });

    expect(res2.status).toBe(403);
  });

  // the test below will be edited to better reflect the element id
  test("Only Admin can Create a Map", async () => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: elementId,
            x: 20,
            y: 20,
          },
          {
            elementId: elementId,
            x: 18,
            y: 20,
          },
          {
            elementId: elementId,
            x: 19,
            y: 20,
          },
          {
            elementId: elementId,
            x: 19,
            y: 20,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // console.log(res.data);

    mapId = res.data.id;
    expect(res.status).toBe(200);
    expect(res.data.id).toBeDefined();

    const res2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
    });

    expect(res2.status).toBe(403);
  });
});

describe("WebSocket Connection happens or not", () => {
  let ws2;
  let a = 0;

  test("Web Socket Connection starting", async () => {
    ws2 = new WebSocket(WS_URL);

    await new Promise(async (r) => {
      ws2.onopen = r;
      a = 1
    });

    ws2.onmessage = (event) => {
      ws2messages.push(JSON.parse(event.data));
    };
    ws2.close();
    expect(a).toBe(1);
  });
});

describe("WebSocket Tests", () => {
  // console.log(
  //   "WEBSOCKETWEBSOCKETWEBSOCKETWEBSOCKETWEBSOCKETWEBSOCKETWEBSOCKET"
  // );

  let adminToken;
  let elementId1;
  let elementId2;
  let mapId;
  let adminId;
  let userId;
  let userToken;
  let spaceId;
  let ws1;
  let ws2;
  let ws1messages = [];
  let ws2messages = [];
  let adminX;
  let adminY;
  let userX;
  let userY;

  function waitForAndPopLatestMessage(messageArray) {
    return new Promise((resolve) => {
      if (messageArray.length > 0) {
        resolve(messageArray.shift()); // If error try parsing here --> JSON.parse
      } else {
        let interval = setInterval(() => {
          if (messageArray.length > 0) {
            resolve(messageArray.shift());
            clearInterval(interval);
          }
        }, 100);
      }
    });
  }

  async function setupHTTP() {
    const username = "harshit" + Math.random() + "@gmail.com";
    const password = "123456";

    const userSignUp = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username,
      password: password,
      type: "user",
    });

    userId = userSignUp.data.userId;
    // console.log(userId);

    const userSignIn = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username,
      password: password,
    });

    userToken = userSignIn.data.token;
    // console.log(userToken);

    const username2 = "harshit" + Math.random() + "@gmail.com";

    const adminSignUp = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: username2,
      password: password,
      type: "admin",
    });

    adminId = adminSignUp.data.userId;
    // console.log("adminId ---- ", adminId);

    const adminSignIn = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: username2,
      password: password,
    });

    adminToken = adminSignIn.data.token;
    // console.log("adminToken ------ ", adminToken);

    const element1 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId1 = element1.data.id;
    // console.log("element1 --- ", element1.data);

    const element2 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    elementId2 = element2.data.id;
    // console.log("element2 --- ", elementId2);

    const map = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: elementId1,
            x: 20,
            y: 20,
          },
          {
            elementId: elementId1,
            x: 18,
            y: 20,
          },
          {
            elementId: elementId2,
            x: 29,
            y: 20,
          },
          {
            elementId: elementId2,
            x: 19,
            y: 40,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    mapId = map.data.id;
    // console.log("map --- ", mapId);

    const space = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    spaceId = space.data.spaceId;
    // console.log("space --- ", spaceId);
  }

  async function setupWS() {
    ws1 = new WebSocket(WS_URL);

    await new Promise((r) => {
      ws1.onopen = r;
    });

    ws1.onmessage = (event) => {
      ws1messages.push(JSON.parse(event.data));
    };

    ws2 = new WebSocket(WS_URL);

    await new Promise(async (r) => {
      ws2.onopen = r;
    });

    ws2.onmessage = (event) => {
      ws2messages.push(JSON.parse(event.data));
    };
  }

  beforeAll(async () => {
    await setupHTTP();
    await setupWS();
  });

  test("Broadcast when user joins", async () => {
    ws1.send(
      JSON.stringify({
        type: "join",
        payload: {
          spaceId: spaceId,
          token: adminToken,
        },
      })
    );

    const message1 = await waitForAndPopLatestMessage(ws1messages);

    ws2.send(
      JSON.stringify({
        type: "join",
        payload: {
          spaceId: spaceId,
          token: userToken,
        },
      })
    );

    const message2 = await waitForAndPopLatestMessage(ws2messages);
    const message3 = await waitForAndPopLatestMessage(ws1messages);

    adminX = message1.payload.spawn.x;
    adminY = message1.payload.spawn.y;

    userX = message2.payload.spawn.x;
    userY = message2.payload.spawn.y;

    expect(message1.type).toBe("space-joined");
    expect(message2.type).toBe("space-joined");
    expect(message1.users.length).toBe(0);
    expect(message2.users.length).toBe(1);
    expect(message3.type).toBe("user-join");

    expect(message3.payload.x).toBe(userX);
    expect(message3.payload.y).toBe(userY);
    expect(message3.payload.userId).toBe(userId);
  });

  test("Movement Rejected for moving out of map", async () => {
    ws1.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: 248786,
          y: 3486721,
        },
      })
    );

    const message = await waitForAndPopLatestMessage(ws1messages);

    expect(message.type).toBe("movement-rejected");
    expect(message.payload.x).toBe(adminX);
    expect(message.payload.y).toBe(adminY);
  });

  test("Movement Rejected for moving two blocks at the same time", async () => {
    ws1.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: adminX + 2,
          y: adminY,
        },
      })
    );

    const message = await waitForAndPopLatestMessage(ws1messages);
    expect(message.type).toBe("movement-rejected");
    expect(message.payload.x).toBe(adminX);
    expect(message.payload.y).toBe(adminY);
  });

  test("Correct Movement are broadcasted to the server", async () => {
    ws1.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: adminX + 1,
          y: adminY,
        },
      })
    );

    const message = await waitForAndPopLatestMessage(ws2messages);

    expect(message.type).toBe("movement");
    expect(message.payload.x).toBe(adminX + 1);
    expect(message.payload.y).toBe(adminY);
    expect(message.payload.userId).toBe(adminId);
  });

  test("Broadcast for when user leaves", async () => {
    ws1.close();
    
    const message = await waitForAndPopLatestMessage(ws2messages);
    ws2.close();
    expect(message.type).toBe("user-left");
    expect(message.payload.userId).toBe(adminId);
  });
});
