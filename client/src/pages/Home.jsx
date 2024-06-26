import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Banner,
  Card,
  Pagination,
  PopularPosts,
  PopularWriters,
} from "../components";
import { usePopularPost, usePosts } from "../hooks/post_hooks";
import { CATEGORIES } from "../utils/dummyData";
import CategoryDropdown from "../components/CategoryDropdown";
import Weather from '../components/Weather'; // Import the Weather component

const Home = () => {
  const { posts, numOfPages, setPage } = usePosts({
    writerId: "",
  });
  const popular = usePopularPost();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [posts]);

  const handlePageChange = (val) => {
    setPage(val);
  };

  if (posts?.length < 1)
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-lg text-slate-500">No Post Available</span>
      </div>
    );

  return (
    <div className="py-10 2xl:py-5">
      <div className="relative">
        <Banner post={posts[currentIndex]} />
      </div>
      <div className="px-0 lg:pl-20 2xl:px-20 ">
        {/* Categories */}
        <div className="mt-6 md:mt-0">
          <p className="text-2xl font-semibold text-gray-600 dark:text-white">
            Popular Categories
          </p>
          <div className="w-full flex flex-wrap py-10 gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/category?cat=${cat?.label}`}
                className={`${cat.color} flex items-center justify-center gap-3 border rounded-full text-white font-semibold text-base px-4 py-2 cursor-pointer`}
                key={cat.label}
              >
                {cat?.icon}
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <CategoryDropdown />
        </div>

        {/* Blog Post */}
        <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">
          {/* LEFT */}
          <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
            {posts?.map((post, index) => (
              <Card key={post?._id} post={post} index={index} />
            ))}

            <div className="w-full flex items-cemter justify-center">
              <Pagination
                totalPages={numOfPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/4 flex flex-col gap-y-12">
            {/* POPULAR POSTS */}
            <PopularPosts posts={popular?.posts} />

            {/* POPULAR WRITERS */}
            <PopularWriters data={popular?.writers} />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
