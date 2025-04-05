import React, { useEffect, useRef, useState } from "react";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
const InfiniteScroll: React.FC = () => {
  const [user, setUser] = useState<UserType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef<HTMLDivElement | null>(null);

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchUser();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      console.log("refff", loadingRef.current);
      observer.observe(loadingRef.current);
    }
    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div>
      <h1>Infinite scroll user List</h1>
      {user.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={item.image}
            alt={item.firstName}
            width="50"
            height="50"
            style={{ marginRight: "10px", borderRadius: "50%" }}
          ></img>
          <p>
            <strong>
              {item.firstName} {item.lastName}
            </strong>{" "}
            - {item.email}
          </p>
        </div>
      ))}
      {hasMore ? (
        <div ref={loadingRef} style={{ textAlign: "center", padding: "10px" }}>
          <h4>Loading data...</h4>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No more users to load!</p>
      )}
    </div>
  );
};

export default InfiniteScroll;
