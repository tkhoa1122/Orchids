import React, { useEffect, useState } from "react";

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Nếu userId có giá trị, gọi API theo id, nếu không thì lấy tất cả
      const url = userId
        ? `https://67ab0f4d65ab088ea7e87a04.mockapi.io/users/${userId}`
        : `https://67ab0f4d65ab088ea7e87a04.mockapi.io/users`;
      const response = await fetch(url);
      const data = await response.json();
      setPosts(userId ? [data] : data);
    };

    fetchData();
  }, [userId]);


  return (
    <div>
      <h2>User Data</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.id}: {post.name}</p>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
