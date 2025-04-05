import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
const InfiniteScrollUser: React.FC = () => {
  const [user, setUser] = useState<UserType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);


  const fetchUser = async () => {
    try {
      const fetchUser = await fetch(
        `https://dummyjson.com/users?limit=20&skip=${(page - 1) * 20}`
      );
      const userList = await fetchUser.json();
      setUser((prev) => [...prev, ...userList.users]);

      if (userList.users.length == 0) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching users list", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Infinite scroll user List</h1>
      <InfiniteScroll
        dataLength={user.length}
        next={fetchUser}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more users to load!</p>}
      >
        {user.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img
              src={item.image}
              alt={item.firstName}
              width="50"
              height="50"
            ></img>
            <p>
              <strong>
                {item.firstName} {item.lastName}
              </strong>{" "}
              - {item.email}
            </p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollUser;
