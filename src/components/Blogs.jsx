import { useEffect, useState } from "react";
import { Calendar, User, ArrowRight, Search, Filter } from "lucide-react";

const Blogs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Why Blood Donation Saves Lives",
      excerpt:
        "Learn how your single donation can help multiple patients and make a real difference in someone's life.",
      author: "Dr. Sarah Williams",
      date: "Jan 10, 2025",
      category: "Health",
      image: "https://redcrossphillyblog.wordpress.com/wp-content/uploads/2021/01/national-blood-donor-month.png",
      readTime: "5 min read",
      featured: true,
      delay: 0,
    },
    {
      id: 2,
      title: "First-Time Donors: What to Expect",
      excerpt:
        "A comprehensive guide for first-time blood donors covering preparation, the process, and aftercare tips.",
      author: "Jessica Lee",
      date: "Jan 8, 2025",
      category: "Guide",
      image: "https://i.ytimg.com/vi/FXmkVg8a2Mo/maxresdefault.jpg",
      readTime: "7 min read",
      delay: 100,
    },
    {
      id: 3,
      title: "The Health Benefits of Regular Donation",
      excerpt: "Discover the surprising health benefits that come with being a regular blood donor.",
      author: "Dr. Michael Chen",
      date: "Jan 5, 2025",
      category: "Health",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQiYM8PpS7NZRir6SjoO_2MbfSUd4vwNfkw&s",
      readTime: "6 min read",
      delay: 200,
    },
    {
      id: 4,
      title: "Emergency Blood Drive Stories",
      excerpt: "Read inspiring stories of how blood donors made critical differences during emergency situations.",
      author: "Emma Thompson",
      date: "Dec 30, 2024",
      category: "Stories",
      image: "https://www.eastendbeacon.com/wp-content/uploads/2023/09/blood-emergency.png",
      readTime: "4 min read",
      delay: 300,
    }
  ];

  const categories = ["All", "Health", "Guide", "Stories", "Education", "Community"];

  useEffect(() => {
    let posts = blogPosts;
    if (activeCategory !== "All") {
      posts = posts.filter((post) => post.category === activeCategory);
    }
    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPosts(posts);
  }, [activeCategory, searchQuery]);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse -top-20 -left-32" />
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse -bottom-20 -right-32" />
        <div className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse top-1/2 right-1/4" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none max-w-7xl mx-auto">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blogs-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blogs-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <p className="text-sm font-semibold tracking-widest text-red-400 uppercase mb-3">✦ Insights & Stories</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Learn About{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Blood Donation
            </span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
            Stay informed with expert insights, donor stories, and health tips from our community.
          </p>
        </div>

        {/* Search & Filter */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3 px-6 py-4 bg-card/40 backdrop-blur-md border border-border/30 rounded-lg group-hover:border-border/60 group-focus-within:border-border/60 transition-all duration-300">
                <Search className="w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent w-full text-white/80 placeholder-white/50 focus:outline-none text-sm"
                />
              </div>
            </div>

            <button className="px-6 py-4 bg-card/40 backdrop-blur-md border border-border/30 rounded-lg hover:border-border/60 hover:bg-card/60 transition-all duration-300 flex items-center gap-2 text-white font-medium group">
              <Filter className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span>Filter</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-card/40 backdrop-blur-md border border-border/30 text-white/80 hover:border-border/60"
                }`}
                style={{ transitionDelay: isLoaded ? `${index * 50}ms` : "0ms" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && searchQuery === "" && (
          <div className={`mb-16 md:mb-20 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-500/5 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden hover:border-border/60 transition-all duration-500">
                <div className="absolute top-6 left-6 z-10">
                  <div className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 lg:p-10">
                  <div className="relative h-64 md:h-80 lg:h-full min-h-80 rounded-xl overflow-hidden group/image">
                    <img
                      src={featuredPost.image || "/images/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="flex flex-col justify-center gap-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/50 text-blue-400 rounded-full text-xs font-semibold mb-4">
                        {featuredPost.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight text-balance group-hover:text-red-400 transition-colors duration-300">
                        {featuredPost.title}
                      </h3>
                    </div>

                    <p className="text-white/70 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div>{featuredPost.readTime}</div>
                    </div>

                    <button className="mt-4 group/btn px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 w-fit">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularPosts.map((post) => (
              <div
                key={post.id}
                className={`group relative transition-all duration-700 transform ${isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
                style={{ transitionDelay: isLoaded ? `${post.delay}ms` : "0ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full flex flex-col bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden hover:border-border/60 hover:bg-card/60 transition-all duration-500">
                  <div className="relative h-48 overflow-hidden group/image">
                    <img
                      src={post.image || "/images/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white/80 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed flex-1 line-clamp-2 group-hover:text-white transition-colors duration-300">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/60 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <div className="ml-auto text-white/50">{post.readTime}</div>
                    </div>

                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium text-sm opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30">
                      Read More
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No articles found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
