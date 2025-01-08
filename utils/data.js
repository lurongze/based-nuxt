import { faker } from "@faker-js/faker";

const avatar = faker.image.avatar();
const selfAvatar = faker.image.avatar();
const selfName = faker.person.fullName();
export function generateMessage(message = "", self = false) {
  return {
    id: faker.string.uuid(),
    self,
    name: self ? selfName : faker.person.fullName(),
    avatar: self ? selfAvatar : avatar,
    message: message ? message : faker.lorem.text(),
  };
}

export function generateLoginUser(name = "", avatar = "") {
  return {
    id: faker.string.uuid(),
    name,
    avatar: avatar ? avatar : selfAvatar,
  };
}

export function generateText() {
  return faker.lorem.text();
}

export function getUuid() {
  return faker.string.uuid();
}

let mockUserInfo = {};

export function mockGetUserInfo(accountKey) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          ...mockUserInfo,
          accountKey,
        },
        code: 200,
      });
    }, 500);
  });
}

export function mockUpdateUserInfo(accountKey, userInfo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUserInfo = { accountKey, ...userInfo };
      resolve({
        data: mockUserInfo,
        code: 200,
      });
    }, 500);
  });
}

export function getMessageTagText(msg) {
  const arr = msg.split("<message>");
  if (arr[1]) {
    return arr[1].replace("</message>", "");
  }
  return msg;
}
