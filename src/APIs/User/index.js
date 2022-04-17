import { client } from "..";

export const getUsernames = () => {
  return client.fetch(
    `*[_type == "user"]{
        _id,
       username
    }`,
    {}
  );
};
